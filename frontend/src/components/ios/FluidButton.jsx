import React from 'react';
import { motion } from 'framer-motion';

const FluidButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  onClick,
  href,
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: `
      bg-white/15
      backdrop-blur-xl
      border border-white/30
      text-white
      hover:bg-white/25
      hover:border-white/40
    `,
    secondary: `
      bg-gradient-to-r from-blue-500/20 to-purple-500/20
      backdrop-blur-xl
      border border-white/20
      text-white
      hover:from-blue-500/30 hover:to-purple-500/30
    `,
    ghost: `
      bg-transparent
      backdrop-blur-sm
      border border-white/10
      text-white/80
      hover:bg-white/10
      hover:text-white
    `,
    solid: `
      bg-white
      text-gray-900
      hover:bg-white/90
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
    xl: 'px-10 py-5 text-xl gap-3'
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        inline-flex items-center justify-center
        ${sizes[size]}
        ${variants[variant]}
        rounded-full
        font-medium
        transition-colors duration-300
        overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      {...props}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{ translateX: '200%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </Component>
  );
};

export default FluidButton;
