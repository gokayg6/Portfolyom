import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const socialIconMap = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter
};

const StaggeredMenu = ({
  items = [],
  socialItems = [],
  position = 'right',
  displaySocials = true,
  displayItemNumbering = true,
  menuButtonColor = '#fff',
  colors = ['#B19EEF', '#5227FF'],
  accentColor = '#60A5FA',
  isFixed = true,
  closeOnClickAway = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 40px) 40px)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40
      }
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.button
        onClick={toggleMenu}
        className={`
          ${isFixed ? 'fixed' : 'absolute'}
          ${position === 'right' ? 'right-6' : 'left-6'}
          top-7 z-[100]
          p-2.5 rounded-full
          bg-white/[0.08] backdrop-blur-xl border border-white/[0.15]
          transition-colors hover:bg-white/[0.15]
          shadow-lg shadow-black/10
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ color: menuButtonColor }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMenu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            {closeOnClickAway && (
              <motion.div
                className="fixed inset-0 z-[80]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />
            )}

            {/* Menu Panel */}
            <motion.div
              className="fixed inset-0 z-[90] flex flex-col justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors[0]}dd 0%, ${colors[1]}dd 100%)`
              }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Menu Content */}
              <div className="container mx-auto px-8 md:px-16">
                {/* Navigation Items */}
                <nav className="mb-16">
                  {items.map((item, i) => {
                    const isActive = location.pathname === item.link;
                    return (
                      <motion.div
                        key={item.label}
                        custom={i}
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          to={item.link}
                          onClick={closeMenu}
                          className={`
                            group flex items-center gap-6 py-4
                            text-4xl md:text-6xl font-light
                            transition-all duration-300
                            ${isActive ? 'text-white' : 'text-white/60 hover:text-white hover:translate-x-4'}
                          `}
                        >
                          {displayItemNumbering && (
                            <span className="text-sm font-mono text-white/40">
                              0{i + 1}
                            </span>
                          )}
                          <span>{item.label}</span>
                          <FiArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Social Links */}
                {displaySocials && socialItems.length > 0 && (
                  <motion.div
                    className="flex items-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {socialItems.map((social) => {
                      const Icon = socialIconMap[social.label] || FaGithub;
                      return (
                        <a
                          key={social.label}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all hover:scale-110"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-8 left-8 text-white/20 text-sm font-mono">
                Gökay & Mithat · 2024
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StaggeredMenu;
