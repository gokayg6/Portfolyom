// Mock Data for iOS Portfolio

export const developers = [
  {
    id: 'gokay',
    name: 'Gökay Gülüstán',
    role: 'Full Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face',
    bio: 'Passionate full-stack developer with expertise in building scalable web applications. Specializing in React, Node.js, and cloud architectures. Turning complex problems into elegant solutions.',
    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'Python', 'MongoDB'],
    social: {
      github: 'https://github.com/placeholder-gokay',
      linkedin: 'https://linkedin.com/in/placeholder-gokay',
      email: 'gokay@example.com'
    },
    experience: '5+ years',
    location: 'Istanbul, Turkey'
  },
  {
    id: 'mithat',
    name: 'Mithat Sadedartar',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=face',
    bio: 'Creative frontend developer focused on crafting beautiful, intuitive user interfaces. Expert in modern CSS, animations, and performance optimization. Making the web beautiful one pixel at a time.',
    techStack: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Figma'],
    social: {
      github: 'https://github.com/placeholder-mithat',
      linkedin: 'https://linkedin.com/in/placeholder-mithat',
      email: 'mithat@example.com'
    },
    experience: '4+ years',
    location: 'Istanbul, Turkey'
  }
];

export const projects = [
  {
    id: '1',
    title: 'iOS-Style Dashboard',
    description: 'A comprehensive analytics dashboard with real-time data visualization, built with glassmorphism design principles.',
    stack: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS'],
    role: 'Full Stack',
    developer: 'gokay',
    year: 2024,
    url: 'https://example.com/dashboard',
    repo: 'https://github.com/example/dashboard',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    category: 'Dashboard'
  },
  {
    id: '2',
    title: 'Insurance Automation Platform',
    description: 'End-to-end insurance processing system with AI-powered claim analysis and automated workflows.',
    stack: ['Node.js', 'Python', 'PostgreSQL', 'AWS Lambda'],
    role: 'Full Stack',
    developer: 'gokay',
    year: 2024,
    url: 'https://example.com/insurance',
    repo: 'https://github.com/example/insurance',
    coverImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    category: 'Web App'
  },
  {
    id: '3',
    title: 'E-commerce Frontend',
    description: 'Modern e-commerce storefront with smooth animations, optimized performance, and seamless checkout experience.',
    stack: ['React', 'Framer Motion', 'Stripe', 'Tailwind CSS'],
    role: 'Frontend',
    developer: 'mithat',
    year: 2024,
    url: 'https://example.com/shop',
    repo: 'https://github.com/example/shop',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    category: 'Landing Page'
  },
  {
    id: '4',
    title: 'Real Estate Analytics',
    description: 'Interactive property analytics platform with map integration, price predictions, and market trends.',
    stack: ['React', 'Mapbox', 'Chart.js', 'Node.js'],
    role: 'Full Stack',
    developer: 'gokay',
    year: 2023,
    url: 'https://example.com/realestate',
    repo: 'https://github.com/example/realestate',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    category: 'Dashboard'
  },
  {
    id: '5',
    title: 'SaaS Landing Page',
    description: 'High-converting landing page with micro-interactions, scroll animations, and optimized mobile experience.',
    stack: ['React', 'GSAP', 'Tailwind CSS', 'Lottie'],
    role: 'Frontend',
    developer: 'mithat',
    year: 2023,
    url: 'https://example.com/saas',
    repo: 'https://github.com/example/saas',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'Landing Page'
  },
  {
    id: '6',
    title: 'Task Automation Suite',
    description: 'Workflow automation tool with visual builder, integrations with 50+ services, and scheduled tasks.',
    stack: ['Python', 'FastAPI', 'Redis', 'React'],
    role: 'Full Stack',
    developer: 'gokay',
    year: 2023,
    url: 'https://example.com/automation',
    repo: 'https://github.com/example/automation',
    coverImage: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
    category: 'Automation'
  },
  {
    id: '7',
    title: 'Fitness Tracking App',
    description: 'Beautiful fitness application UI with workout tracking, progress charts, and social features.',
    stack: ['React Native', 'TypeScript', 'Reanimated', 'Firebase'],
    role: 'Frontend',
    developer: 'mithat',
    year: 2024,
    url: 'https://example.com/fitness',
    repo: 'https://github.com/example/fitness',
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
    category: 'Web App'
  },
  {
    id: '8',
    title: 'AI Content Generator',
    description: 'GPT-powered content generation platform with templates, brand voice customization, and team collaboration.',
    stack: ['Next.js', 'OpenAI', 'PostgreSQL', 'Vercel'],
    role: 'Full Stack',
    developer: 'gokay',
    year: 2024,
    url: 'https://example.com/ai-content',
    repo: 'https://github.com/example/ai-content',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    category: 'Web App'
  }
];

export const categories = [
  { id: 'all', name: 'All Projects', icon: 'grid' },
  { id: 'Web App', name: 'Web Apps', icon: 'globe' },
  { id: 'Dashboard', name: 'Dashboards', icon: 'chart' },
  { id: 'Landing Page', name: 'Landing Pages', icon: 'layout' },
  { id: 'Automation', name: 'Automations', icon: 'zap' }
];

export const navItems = [
  { label: 'Home', link: '/', ariaLabel: 'Go to home page' },
  { label: 'About', link: '/about', ariaLabel: 'Learn about us' },
  { label: 'Projects', link: '/projects', ariaLabel: 'View our projects' },
  { label: 'Contact', link: '/contact', ariaLabel: 'Get in touch' }
];

export const socialLinks = [
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Twitter', link: 'https://twitter.com' }
];
