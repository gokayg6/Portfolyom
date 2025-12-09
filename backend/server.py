from fastapi import FastAPI, APIRouter, Request, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from collections import defaultdict
import shutil


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create uploads directory
UPLOADS_DIR = ROOT_DIR / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Mount static files for uploads
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class Visit(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    ip_address: str
    user_agent: str
    path: str
    referrer: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))

class VisitCreate(BaseModel):
    ip_address: str
    user_agent: str
    path: str
    referrer: Optional[str] = None
    session_id: Optional[str] = None

class ContentUpdate(BaseModel):
    type: str  # 'developers', 'projects', 'navItems', 'socialLinks'
    data: Dict[str, Any]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# File upload endpoints
@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload a file and return its URL"""
    # Validate file type
    allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="File type not allowed")
    
    # Generate unique filename
    ext = Path(file.filename).suffix
    filename = f"{uuid.uuid4()}{ext}"
    file_path = UPLOADS_DIR / filename
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    # Get base URL from environment or use default
    base_url = os.environ.get('BASE_URL', 'http://localhost:8000')
    file_url = f"{base_url}/uploads/{filename}"
    
    # Save to database
    upload_doc = {
        "id": str(uuid.uuid4()),
        "filename": filename,
        "original_name": file.filename,
        "content_type": file.content_type,
        "url": file_url,
        "uploaded_at": datetime.now(timezone.utc).isoformat()
    }
    await db.uploads.insert_one(upload_doc)
    
    return {"success": True, "url": file_url, "filename": filename}

@api_router.get("/uploads")
async def list_uploads():
    """List all uploaded files"""
    uploads = await db.uploads.find({}, {"_id": 0}).sort("uploaded_at", -1).to_list(100)
    return {"uploads": uploads}

@api_router.delete("/uploads/{filename}")
async def delete_upload(filename: str):
    """Delete an uploaded file"""
    file_path = UPLOADS_DIR / filename
    
    if file_path.exists():
        file_path.unlink()
    
    await db.uploads.delete_one({"filename": filename})
    return {"success": True, "message": "File deleted"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Visit tracking endpoint
@api_router.post("/visits", response_model=Visit)
async def create_visit(visit: VisitCreate, request: Request):
    visit_dict = visit.model_dump()
    
    # Get real IP address from request
    client_ip = request.client.host
    if request.headers.get("x-forwarded-for"):
        client_ip = request.headers.get("x-forwarded-for").split(",")[0].strip()
    elif request.headers.get("x-real-ip"):
        client_ip = request.headers.get("x-real-ip")
    
    visit_dict['ip_address'] = client_ip
    
    if not visit_dict.get('session_id'):
        visit_dict['session_id'] = str(uuid.uuid4())
    
    visit_obj = Visit(**visit_dict)
    doc = visit_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.visits.insert_one(doc)
    return visit_obj

# Admin statistics endpoints
@api_router.get("/admin/stats")
async def get_admin_stats():
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=7)
    month_start = today_start - timedelta(days=30)
    
    # Total visits
    total_visits = await db.visits.count_documents({})
    
    # Today's visits
    today_visits = await db.visits.count_documents({
        "timestamp": {"$gte": today_start.isoformat()}
    })
    
    # This week's visits
    week_visits = await db.visits.count_documents({
        "timestamp": {"$gte": week_start.isoformat()}
    })
    
    # This month's visits
    month_visits = await db.visits.count_documents({
        "timestamp": {"$gte": month_start.isoformat()}
    })
    
    # Unique visitors (by session_id)
    unique_visitors = len(await db.visits.distinct("session_id"))
    
    # Unique visitors today
    today_unique = len(await db.visits.distinct("session_id", {
        "timestamp": {"$gte": today_start.isoformat()}
    }))
    
    # Recent visits for hourly chart
    recent_visits_cursor = db.visits.find({
        "timestamp": {"$gte": (now - timedelta(hours=24)).isoformat()}
    })
    recent_visits = await recent_visits_cursor.to_list(10000)
    
    # Most visited pages
    pipeline = [
        {"$group": {"_id": "$path", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    top_pages = await db.visits.aggregate(pipeline).to_list(10)
    top_pages = [{"path": page["_id"], "visits": page["count"]} for page in top_pages]
    
    # Visits by hour (last 24 hours)
    hour_visits = defaultdict(int)
    
    for visit in recent_visits:
        if isinstance(visit.get('timestamp'), str):
            visit_time = datetime.fromisoformat(visit['timestamp'])
        else:
            visit_time = visit.get('timestamp', now)
        hour = visit_time.hour
        hour_visits[hour] += 1
    
    hourly_data = [{"hour": h, "visits": hour_visits[h]} for h in range(24)]
    
    return {
        "total_visits": total_visits,
        "today_visits": today_visits,
        "week_visits": week_visits,
        "month_visits": month_visits,
        "unique_visitors": unique_visitors,
        "today_unique": today_unique,
        "top_pages": top_pages,
        "hourly_visits": hourly_data
    }

# Get all visits
@api_router.get("/admin/visits")
async def get_all_visits(limit: int = 100, skip: int = 0):
    visits = await db.visits.find({}, {"_id": 0}).sort("timestamp", -1).skip(skip).limit(limit).to_list(limit)
    
    for visit in visits:
        if isinstance(visit.get('timestamp'), str):
            visit['timestamp'] = datetime.fromisoformat(visit['timestamp'])
    
    total = await db.visits.count_documents({})
    return {"visits": visits, "total": total}

# Initialize mock data if not exists
async def initialize_mock_data():
    # Check if data exists
    existing = await db.content.find_one({"type": "developers"})
    if not existing:
        MOCK_DATA = {
            "developers": [
                {
                    "id": "gokay",
                    "name": "Gökay Gülüstán",
                    "role": "Full Stack Developer",
                    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
                    "bio": "Passionate full-stack developer with expertise in building scalable web applications.",
                    "techStack": ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "Python", "MongoDB"],
                    "social": {"github": "https://github.com/placeholder-gokay", "linkedin": "https://linkedin.com/in/placeholder-gokay", "email": "gokay@example.com"},
                    "experience": "5+ years",
                    "location": "Istanbul, Turkey"
                },
                {
                    "id": "mithat",
                    "name": "Mithat Sadedartar",
                    "role": "Frontend Developer",
                    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face",
                    "bio": "Creative frontend developer focused on crafting beautiful, intuitive user interfaces.",
                    "techStack": ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Figma"],
                    "social": {"github": "https://github.com/placeholder-mithat", "linkedin": "https://linkedin.com/in/placeholder-mithat", "email": "mithat@example.com"},
                    "experience": "4+ years",
                    "location": "Istanbul, Turkey"
                }
            ],
            "projects": [
                {"id": "1", "title": "iOS-Style Dashboard", "description": "A comprehensive analytics dashboard", "stack": ["React", "TypeScript"], "role": "Full Stack", "developer": "gokay", "year": 2024, "url": "https://example.com/dashboard", "repo": "https://github.com/example/dashboard", "coverImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", "category": "Dashboard"},
                {"id": "2", "title": "Insurance Automation Platform", "description": "End-to-end insurance processing system", "stack": ["Node.js", "Python"], "role": "Full Stack", "developer": "gokay", "year": 2024, "url": "https://example.com/insurance", "repo": "https://github.com/example/insurance", "coverImage": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop", "category": "Web App"}
            ],
            "navItems": [
                {"label": "Home", "link": "/", "ariaLabel": "Go to home page"},
                {"label": "About", "link": "/about", "ariaLabel": "Learn about us"},
                {"label": "Projects", "link": "/projects", "ariaLabel": "View our projects"},
                {"label": "Contact", "link": "/contact", "ariaLabel": "Get in touch"}
            ],
            "socialLinks": [
                {"label": "GitHub", "link": "https://github.com"},
                {"label": "LinkedIn", "link": "https://linkedin.com"},
                {"label": "Twitter", "link": "https://twitter.com"}
            ]
        }
        for content_type, data in MOCK_DATA.items():
            await db.content.update_one(
                {"type": content_type},
                {"$set": {"type": content_type, "data": data}},
                upsert=True
            )

# Content management endpoints
@api_router.get("/admin/content/{content_type}")
async def get_content(content_type: str):
    await initialize_mock_data()  # Ensure data exists
    content = await db.content.find_one({"type": content_type}, {"_id": 0})
    if not content:
        return {"type": content_type, "data": []}
    return content

@api_router.put("/admin/content/{content_type}")
async def update_content(content_type: str, content_update: ContentUpdate):
    result = await db.content.update_one(
        {"type": content_type},
        {"$set": {"type": content_type, "data": content_update.data}},
        upsert=True
    )
    return {"success": True, "type": content_type}

@api_router.get("/admin/content")
async def get_all_content():
    await initialize_mock_data()  # Ensure data exists
    all_content = await db.content.find({}, {"_id": 0}).to_list(100)
    return {"content": all_content}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()