import React from 'react';
import {
    LayoutDashboard, BarChart3, FileText, Image, Settings,
    ChevronRight, LogOut
} from 'lucide-react';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'content', label: 'İçerik Yönetimi', icon: FileText },
    { id: 'media', label: 'Medya', icon: Image },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
];

const Sidebar = ({ activeTab, setActiveTab, collapsed = false }) => {
    return (
        <aside
            className={`
        fixed left-0 top-0 bottom-0 z-50
        bg-[#0f0f13] border-r border-white/[0.06]
        flex flex-col
        transition-all duration-300 ease-out
        ${collapsed ? 'w-16' : 'w-64'}
      `}
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">A</span>
                    </div>
                    {!collapsed && (
                        <span className="text-white font-semibold text-lg tracking-tight">Admin</span>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 group
                ${isActive
                                    ? 'bg-violet-500/15 text-violet-400'
                                    : 'text-white/60 hover:bg-white/[0.04] hover:text-white/90'}
              `}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-violet-400' : ''}`} />
                            {!collapsed && (
                                <>
                                    <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                                    {isActive && (
                                        <ChevronRight className="w-4 h-4 opacity-60" />
                                    )}
                                </>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/[0.06]">
                <button
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    {!collapsed && <span className="text-sm font-medium">Çıkış</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
