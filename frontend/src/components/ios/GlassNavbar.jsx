import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import FluidButton from './FluidButton';

const GlassNavbar = ({ items = [], logo }) => {
  const location = useLocation();

  return (
    <motion.header
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-4xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
    >
      <nav className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-lg shadow-black/10 px-4 py-3">
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {logo || (
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G&M</span>
                </div>
                <span className="hidden sm:block text-white font-semibold text-sm">
                  Portfolio
                </span>
              </motion.div>
            )}
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive = location.pathname === item.link;
              return (
                <Link key={item.label} to={item.link}>
                  <motion.span
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium
                      transition-colors duration-300
                      ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/15 rounded-xl"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link to="/contact">
            <FluidButton variant="primary" size="sm">
              İletişime Geç
            </FluidButton>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default GlassNavbar;
