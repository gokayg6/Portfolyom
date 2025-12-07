import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
  children,
  className = '',
  blur = 'xl',
  opacity = 10,
  border = true,
  hover = true,
  onClick,
  ...props
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl'
  };

  return (
    <motion.div
      className={`
        relative
        bg-white/${opacity}
        ${blurClasses[blur]}
        ${border ? 'border border-white/20' : ''}
        rounded-2xl
        shadow-lg
        shadow-black/10
        ${className}
      `}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onClick={onClick}
      {...props}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default GlassCard;
