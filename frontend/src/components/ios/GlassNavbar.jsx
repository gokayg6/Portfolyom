import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const GlassNavbar = ({ items = [], logo }) => {
  const location = useLocation();

  return (
    <motion.header
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
    >
      {/* Pill-shaped frosted glass navbar */}
      <nav className="relative bg-white/[0.08] backdrop-blur-2xl rounded-full border border-white/[0.15] shadow-2xl shadow-black/20 px-2 py-2">
        {/* Inner subtle glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
        
        <div className="relative flex items-center gap-1">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-3 py-1.5">
            {logo || (
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">G&M</span>
                </div>
                <span className="text-white font-medium text-sm">
                  Portfolio
                </span>
              </motion.div>
            )}
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-white/10 mx-1" />

          {/* Navigation Links */}
          <div className="flex items-center">
            {items.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link key={item.label} to={item.link}>
                  <motion.span
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium
                      transition-all duration-200
                      ${isActive ? 'text-white' : 'text-white/50 hover:text-white/80'}
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 bg-white/[0.12] rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default GlassNavbar;
