import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Sidebar from '../components/admin/Sidebar';
import StatCard from '../components/admin/StatCard';
import DataTable from '../components/admin/DataTable';
import ImageUploader from '../components/admin/ImageUploader';
import { developers as mockDevelopers, projects as mockProjects, navItems as mockNavItems, socialLinks as mockSocialLinks } from '../data/mock';
import {
  Users, Eye, TrendingUp, Calendar, Globe, Clock, BarChart3,
  FileText, Save, Edit, Trash2, Plus, X, RefreshCw,
  Activity, Monitor, Smartphone, ArrowUpRight, ArrowDownRight,
  Image, Settings, ChevronDown, Search, Filter, Download, Check, AlertCircle
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Default mock data
const MOCK_DATA = {
  developers: mockDevelopers,
  projects: mockProjects,
  navItems: mockNavItems,
  socialLinks: mockSocialLinks
};

const Admin = () => {
  const [stats, setStats] = useState({
    total_visits: 1234,
    today_visits: 45,
    week_visits: 312,
    month_visits: 890,
    unique_visitors: 567,
    today_unique: 23,
    top_pages: [
      { path: '/', visits: 456 },
      { path: '/projects', visits: 234 },
      { path: '/about', visits: 178 },
      { path: '/contact', visits: 89 }
    ],
    hourly_visits: Array.from({ length: 24 }, (_, i) => ({ hour: i, visits: Math.floor(Math.random() * 20) }))
  });
  const [visits, setVisits] = useState([
    { path: '/', timestamp: new Date().toISOString(), user_agent: 'Mozilla/5.0' },
    { path: '/projects', timestamp: new Date(Date.now() - 60000).toISOString(), user_agent: 'Chrome/120' },
    { path: '/about', timestamp: new Date(Date.now() - 120000).toISOString(), user_agent: 'Safari/17' }
  ]);
  const [content, setContent] = useState(MOCK_DATA);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedContentType, setSelectedContentType] = useState('developers');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'

  // Fetch functions with fallback
  const fetchStats = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/stats`);
      setStats(response.data);
      setLastUpdate(new Date());
    } catch (error) {
      console.log('Using mock stats data');
      setLastUpdate(new Date());
    }
  }, []);

  const fetchVisits = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/visits?limit=100`);
      setVisits(response.data.visits || []);
    } catch (error) {
      console.log('Using mock visits data');
    }
  }, []);

  const fetchContent = useCallback(async (type) => {
    try {
      const response = await axios.get(`${API_URL}/admin/content/${type}`);
      if (response.data.data && response.data.data.length > 0) {
        setContent(prev => ({ ...prev, [type]: response.data.data }));
      }
    } catch (error) {
      console.log(`Using mock ${type} data`);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Load mock data immediately
      setContent(MOCK_DATA);

      // Then try to fetch from API
      await Promise.all([
        fetchStats(),
        fetchVisits(),
        fetchContent('developers'),
        fetchContent('projects'),
        fetchContent('navItems'),
        fetchContent('socialLinks')
      ]);
      setLoading(false);
    };
    loadData();

    const interval = setInterval(() => {
      fetchStats();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchStats, fetchVisits, fetchContent]);


  const handleSaveContent = useCallback(async () => {
    try {
      await axios.put(`${API_URL}/admin/content/${selectedContentType}`, {
        type: selectedContentType,
        data: content[selectedContentType] || []
      });
      alert('✅ İçerik başarıyla kaydedildi!');
      setEditingItem(null);
    } catch (error) {
      console.error('Failed to save:', error);
      alert('❌ Kaydetme hatası!');
    }
  }, [selectedContentType, content]);

  const handleAddItem = useCallback(() => {
    const newItem = getDefaultItem(selectedContentType);
    setContent(prev => ({
      ...prev,
      [selectedContentType]: [...(prev[selectedContentType] || []), newItem]
    }));
    setEditingItem(content[selectedContentType]?.length || 0);
    setFormData(newItem);
  }, [selectedContentType, content]);

  const handleDeleteItem = useCallback((row, index) => {
    if (window.confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
      setContent(prev => ({
        ...prev,
        [selectedContentType]: prev[selectedContentType].filter((_, i) => i !== index)
      }));
    }
  }, [selectedContentType]);

  const handleEditItem = useCallback((item, index) => {
    setEditingItem(index);
    setFormData({ ...item });
  }, []);

  const handleFieldChange = useCallback((field, value) => {
    setFormData(prev => {
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return { ...prev, [parent]: { ...prev[parent], [child]: value } };
      }
      if (field === 'techStack' || field === 'stack') {
        return { ...prev, [field]: value.split(',').map(s => s.trim()).filter(Boolean) };
      }
      return { ...prev, [field]: value };
    });
  }, []);

  const handleSaveItem = useCallback(() => {
    if (editingItem === null) return;
    setContent(prev => {
      const newContent = [...(prev[selectedContentType] || [])];
      newContent[editingItem] = formData;
      return { ...prev, [selectedContentType]: newContent };
    });
    setEditingItem(null);
    setFormData({});
  }, [editingItem, formData, selectedContentType]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/20 border-t-violet-500 rounded-full animate-spin" />
          <span className="text-white/40 text-sm">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="px-8 py-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'analytics' && 'Analytics'}
                {activeTab === 'content' && 'İçerik Yönetimi'}
                {activeTab === 'media' && 'Medya Kütüphanesi'}
                {activeTab === 'settings' && 'Ayarlar'}
              </h1>
              <p className="text-sm text-white/40 mt-1 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" />
                Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { fetchStats(); fetchVisits(); }}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <DashboardView key="dashboard" stats={stats} visits={visits} />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsView key="analytics" stats={stats} visits={visits} />
            )}
            {activeTab === 'content' && (
              <ContentView
                key="content"
                content={content}
                selectedContentType={selectedContentType}
                setSelectedContentType={setSelectedContentType}
                editingItem={editingItem}
                formData={formData}
                onSave={handleSaveContent}
                onAdd={handleAddItem}
                onDelete={handleDeleteItem}
                onEdit={handleEditItem}
                onFieldChange={handleFieldChange}
                onSaveItem={handleSaveItem}
                setEditingItem={setEditingItem}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
            {activeTab === 'media' && (
              <MediaView key="media" />
            )}
            {activeTab === 'settings' && (
              <SettingsView key="settings" />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// Dashboard View
const DashboardView = ({ stats, visits }) => {
  const recentVisits = visits.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Eye} label="Toplam Ziyaret" value={stats?.total_visits || 0} subtitle="Tüm zamanlar" trend={12} />
        <StatCard icon={Calendar} label="Bugün" value={stats?.today_visits || 0} subtitle={`${stats?.today_unique || 0} benzersiz`} trend={8} />
        <StatCard icon={TrendingUp} label="Bu Hafta" value={stats?.week_visits || 0} subtitle="Son 7 gün" trend={-3} />
        <StatCard icon={Users} label="Benzersiz Ziyaretçi" value={stats?.unique_visitors || 0} subtitle="Toplam" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatCard icon={Monitor} label="Bu Ay" value={stats?.month_visits || 0} subtitle="Aylık ziyaret" />
        <StatCard icon={Smartphone} label="Aktif Oturumlar" value={Math.floor(Math.random() * 10) + 1} subtitle="Şu an online" />
        <StatCard icon={Globe} label="Sayfa Görüntüleme" value={(stats?.total_visits || 0) * 2.3 | 0} subtitle="Ortalama 2.3 sayfa/ziyaret" />
      </div>

      {/* Recent Activity & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Visits */}
        <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-white/40" />
            Son Ziyaretler
          </h3>
          <div className="space-y-3">
            {recentVisits.map((visit, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-sm text-white/80">{visit.path}</p>
                  <p className="text-xs text-white/30 mt-0.5">{new Date(visit.timestamp).toLocaleString('tr-TR')}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-white/40" />
            En Popüler Sayfalar
          </h3>
          <div className="space-y-3">
            {stats?.top_pages?.slice(0, 5).map((page, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-sm text-white/80">{page.path}</span>
                <span className="text-sm font-medium text-white bg-white/[0.06] px-3 py-1 rounded-lg">
                  {page.visits}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Analytics View
const AnalyticsView = ({ stats, visits }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Hourly Chart */}
      <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-white/40" />
          Son 24 Saat
        </h3>
        <div className="flex items-end gap-1 h-48">
          {stats?.hourly_visits?.map((hour, index) => {
            const maxVisits = Math.max(...stats.hourly_visits.map(h => h.visits), 1);
            const height = (hour.visits / maxVisits) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div
                  className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t hover:from-violet-500 hover:to-violet-300 transition-all cursor-pointer relative"
                  style={{ height: `${Math.max(height, 4)}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {hour.visits} ziyaret
                  </div>
                </div>
                <span className="text-xs text-white/30 mt-2">{hour.hour}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Visits Table */}
      <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-white/40" />
            Tüm Ziyaretler ({visits.length})
          </h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 text-sm transition-all">
            <Download className="w-4 h-4" />
            Dışa Aktar
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto space-y-2">
          {visits.map((visit, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all">
              <div className="flex-1">
                <p className="text-sm text-white/80 font-medium">{visit.path}</p>
                <p className="text-xs text-white/40 mt-1 truncate max-w-md">{visit.user_agent}</p>
              </div>
              <span className="text-xs text-white/30">
                {new Date(visit.timestamp).toLocaleString('tr-TR')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Content View
const ContentView = ({
  content, selectedContentType, setSelectedContentType, editingItem, formData,
  onSave, onAdd, onDelete, onEdit, onFieldChange, onSaveItem, setEditingItem,
  searchQuery, setSearchQuery
}) => {
  const contentTypes = [
    { id: 'developers', label: 'Geliştiriciler', icon: Users },
    { id: 'projects', label: 'Projeler', icon: FileText },
    { id: 'navItems', label: 'Menü', icon: Settings },
    { id: 'socialLinks', label: 'Sosyal', icon: Globe }
  ];

  const currentContent = content[selectedContentType] || [];
  const filteredContent = currentContent.filter(item => {
    if (!searchQuery) return true;
    const name = item.name || item.title || item.label || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Content Type Selector */}
      <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-2">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedContentType(type.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${selectedContentType === type.id
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white'}
              `}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ara..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-[#16161c] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/80 text-sm font-medium transition-all"
          >
            <Plus className="w-4 h-4" />
            Yeni Ekle
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-all"
          >
            <Save className="w-4 h-4" />
            Kaydet
          </button>
        </div>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredContent.map((item, index) => (
          <ContentCard
            key={index}
            item={item}
            index={index}
            type={selectedContentType}
            isEditing={editingItem === index}
            formData={formData}
            onEdit={() => onEdit(item, index)}
            onDelete={() => onDelete(item, index)}
            onFieldChange={onFieldChange}
            onSave={onSaveItem}
            onCancel={() => setEditingItem(null)}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Content Card Component
const ContentCard = ({ item, index, type, isEditing, formData, onEdit, onDelete, onFieldChange, onSave, onCancel }) => {
  if (isEditing) {
    return (
      <div className="bg-[#16161c] border border-violet-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-violet-400 flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Düzenleniyor
          </span>
          <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {type === 'developers' && (
          <div className="space-y-4">
            {/* Avatar Preview & Upload */}
            <div className="flex items-start gap-4">
              {formData.avatar && (
                <img src={formData.avatar} alt="" className="w-16 h-16 rounded-xl object-cover" />
              )}
              <div className="flex-1">
                <label className="block text-xs text-white/40 mb-2">Avatar URL veya Yükle</label>
                <input
                  type="text"
                  value={formData.avatar || ''}
                  onChange={(e) => onFieldChange('avatar', e.target.value)}
                  placeholder="https://... veya aşağıdan yükle"
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder-white/30"
                />
              </div>
            </div>
            <ImageUploader value={formData.avatar} onChange={(url) => onFieldChange('avatar', url)} />

            <div className="grid grid-cols-2 gap-4">
              <InputField label="İsim *" value={formData.name || ''} onChange={(v) => onFieldChange('name', v)} />
              <InputField label="Rol *" value={formData.role || ''} onChange={(v) => onFieldChange('role', v)} />
            </div>

            <InputField label="Biyografi" value={formData.bio || ''} onChange={(v) => onFieldChange('bio', v)} multiline />

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Deneyim" value={formData.experience || ''} onChange={(v) => onFieldChange('experience', v)} placeholder="örn: 5+ years" />
              <InputField label="Lokasyon" value={formData.location || ''} onChange={(v) => onFieldChange('location', v)} placeholder="örn: Istanbul, Turkey" />
            </div>

            <InputField
              label="Tech Stack"
              value={formData.techStack?.join(', ') || ''}
              onChange={(v) => onFieldChange('techStack', v)}
              placeholder="React, Node.js, TypeScript (virgülle ayırın)"
            />

            {/* Social Links */}
            <div className="border-t border-white/[0.06] pt-4 mt-4">
              <label className="block text-xs text-white/40 mb-3 uppercase tracking-wider">Sosyal Bağlantılar</label>
              <div className="grid grid-cols-1 gap-3">
                <InputField
                  label="GitHub"
                  value={formData.social?.github || ''}
                  onChange={(v) => onFieldChange('social.github', v)}
                  placeholder="https://github.com/username"
                />
                <InputField
                  label="LinkedIn"
                  value={formData.social?.linkedin || ''}
                  onChange={(v) => onFieldChange('social.linkedin', v)}
                  placeholder="https://linkedin.com/in/username"
                />
                <InputField
                  label="Email"
                  value={formData.social?.email || ''}
                  onChange={(v) => onFieldChange('social.email', v)}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>
        )}

        {type === 'projects' && (
          <div className="space-y-4">
            {/* Cover Image Preview & Upload */}
            {formData.coverImage && (
              <div className="relative rounded-xl overflow-hidden h-32">
                <img src={formData.coverImage} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            <InputField label="Başlık *" value={formData.title || ''} onChange={(v) => onFieldChange('title', v)} />
            <InputField label="Açıklama" value={formData.description || ''} onChange={(v) => onFieldChange('description', v)} multiline />

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Kategori" value={formData.category || ''} onChange={(v) => onFieldChange('category', v)} placeholder="Dashboard, Web App, etc." />
              <InputField label="Yıl" value={formData.year || ''} onChange={(v) => onFieldChange('year', v)} placeholder="2024" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Rol" value={formData.role || ''} onChange={(v) => onFieldChange('role', v)} placeholder="Full Stack, Frontend, etc." />
              <InputField label="Geliştirici" value={formData.developer || ''} onChange={(v) => onFieldChange('developer', v)} placeholder="developer id" />
            </div>

            <InputField
              label="Stack"
              value={formData.stack?.join(', ') || ''}
              onChange={(v) => onFieldChange('stack', v)}
              placeholder="React, TypeScript, Node.js (virgülle ayırın)"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField label="Demo URL" value={formData.url || ''} onChange={(v) => onFieldChange('url', v)} placeholder="https://..." />
              <InputField label="Repo URL" value={formData.repo || ''} onChange={(v) => onFieldChange('repo', v)} placeholder="https://github.com/..." />
            </div>

            <div>
              <label className="block text-xs text-white/40 mb-2">Cover Image</label>
              <input
                type="text"
                value={formData.coverImage || ''}
                onChange={(e) => onFieldChange('coverImage', e.target.value)}
                placeholder="https://... veya aşağıdan yükle"
                className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder-white/30 mb-2"
              />
              <ImageUploader value={formData.coverImage} onChange={(url) => onFieldChange('coverImage', url)} />
            </div>
          </div>
        )}

        {type === 'navItems' && (
          <div className="space-y-4">
            <InputField label="Etiket *" value={formData.label || ''} onChange={(v) => onFieldChange('label', v)} placeholder="Home, About, Contact..." />
            <InputField label="Link *" value={formData.link || ''} onChange={(v) => onFieldChange('link', v)} placeholder="/about, /projects..." />
            <InputField label="Aria Label" value={formData.ariaLabel || ''} onChange={(v) => onFieldChange('ariaLabel', v)} placeholder="Erişilebilirlik için açıklama" />
          </div>
        )}

        {type === 'socialLinks' && (
          <div className="space-y-4">
            <InputField label="Platform *" value={formData.label || ''} onChange={(v) => onFieldChange('label', v)} placeholder="GitHub, LinkedIn, Twitter..." />
            <InputField label="URL *" value={formData.link || ''} onChange={(v) => onFieldChange('link', v)} placeholder="https://..." />
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t border-white/[0.06]">
          <button
            onClick={onSave}
            className="flex-1 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Değişiklikleri Kaydet
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 text-sm font-medium transition-all"
          >
            İptal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all group">
      <div className="flex items-start gap-4">
        {(item.avatar || item.coverImage) && (
          <img
            src={item.avatar || item.coverImage}
            alt=""
            className="w-12 h-12 rounded-xl object-cover bg-white/[0.04]"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold truncate">{item.name || item.title || item.label}</h4>
          {item.role && <p className="text-sm text-white/50 mt-0.5">{item.role}</p>}
          {item.description && <p className="text-sm text-white/40 mt-1 line-clamp-2">{item.description}</p>}
          {item.link && <p className="text-xs text-white/30 mt-2 truncate">{item.link}</p>}
        </div>
      </div>
      <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white/60 text-sm transition-all"
        >
          <Edit className="w-3.5 h-3.5" />
          Düzenle
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Sil
        </button>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, value, onChange, placeholder, multiline }) => (
  <div>
    <label className="block text-xs text-white/40 mb-2">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:border-white/20 resize-none transition-all"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/30 focus:outline-none focus:border-white/20 transition-all"
      />
    )}
  </div>
);

// Media View (Placeholder)
const MediaView = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-6"
  >
    <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-8 text-center">
      <Image className="w-12 h-12 text-white/20 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">Medya Kütüphanesi</h3>
      <p className="text-white/40 text-sm mb-6">Yüklediğiniz tüm görseller burada listenecek</p>
      <ImageUploader
        placeholder="Yeni görsel yüklemek için tıklayın veya sürükleyin"
        onUploadComplete={(data) => console.log('Uploaded:', data)}
      />
    </div>
  </motion.div>
);

// Settings View (Placeholder)
const SettingsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="space-y-6"
  >
    <div className="bg-[#16161c] border border-white/[0.06] rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Site Ayarları</h3>
      <div className="space-y-4">
        <InputField label="Site Başlığı" value="Emergent" onChange={() => { }} />
        <InputField label="Site Açıklaması" value="Fullstack App" onChange={() => { }} />
        <InputField label="İletişim E-posta" value="contact@example.com" onChange={() => { }} />
      </div>
      <button className="mt-6 px-5 py-2.5 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium transition-all">
        Kaydet
      </button>
    </div>
  </motion.div>
);

function getDefaultItem(type) {
  const defaults = {
    developers: { id: `dev_${Date.now()}`, name: '', role: '', bio: '', techStack: [], social: {}, experience: '', location: '', avatar: '' },
    projects: { id: `proj_${Date.now()}`, title: '', description: '', stack: [], role: '', developer: '', year: new Date().getFullYear(), url: '', repo: '', coverImage: '', category: '' },
    navItems: { label: '', link: '', ariaLabel: '' },
    socialLinks: { label: '', link: '' }
  };
  return defaults[type] || {};
}

export default Admin;
