import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subtitle, trend, className = '' }) => {
    const isPositive = trend > 0;

    return (
        <div
            className={`
        bg-[#16161c] border border-white/[0.06] rounded-2xl p-5
        hover:border-white/[0.12] transition-all duration-200
        ${className}
      `}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-white/[0.04]">
                    <Icon className="w-5 h-5 text-white/60" />
                </div>
                {trend !== undefined && (
                    <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <div className="text-3xl font-bold text-white tracking-tight">
                    {typeof value === 'number' ? value.toLocaleString('tr-TR') : value}
                </div>
                <div className="text-sm text-white/40 font-medium">{label}</div>
                {subtitle && (
                    <div className="text-xs text-white/30 mt-1">{subtitle}</div>
                )}
            </div>
        </div>
    );
};

export default StatCard;
