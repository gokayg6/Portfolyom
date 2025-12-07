import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiGlobe, FiBarChart2, FiLayout, FiZap } from 'react-icons/fi';

const iconMap = {
  grid: FiGrid,
  globe: FiGlobe,
  chart: FiBarChart2,
  layout: FiLayout,
  zap: FiZap
};

const FlowingMenu = ({ items = [], onSelect, selectedId = 'all' }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="flex flex-col gap-1">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || FiGrid;
        const isSelected = selectedId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => onSelect?.(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`
              relative flex items-center gap-3 px-4 py-3 rounded-xl
              text-left transition-colors duration-300
              ${isSelected ? 'text-white' : 'text-white/60 hover:text-white/90'}
            `}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background highlight */}
            {(isSelected || isHovered) && (
              <motion.div
                layoutId="menu-highlight"
                className={`
                  absolute inset-0 rounded-xl
                  ${isSelected ? 'bg-white/15' : 'bg-white/5'}
                  backdrop-blur-sm border border-white/10
                `}
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Content */}
            <span className="relative z-10">
              <Icon className="w-5 h-5" />
            </span>
            <span className="relative z-10 font-medium text-sm">
              {item.name}
            </span>

            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-400"
                layoutId="menu-indicator"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default FlowingMenu;
