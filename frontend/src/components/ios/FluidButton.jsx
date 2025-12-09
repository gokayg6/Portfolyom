import React from 'react';
import { motion } from 'framer-motion';

const FluidButton = ({
  children,
  size = 'md',
  variant = 'primary',
  className = '',
  icon,
  iconPosition = 'left',
  onClick,
  href,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const sizes = {
    sm: { height: 'h-10', padding: 'px-4', text: 'text-sm' },
    md: { height: 'h-12', padding: 'px-6', text: 'text-base' },
    lg: { height: 'h-14', padding: 'px-8', text: 'text-lg' },
    xl: { height: 'h-16', padding: 'px-10', text: 'text-xl' }
  };

  const variants = {
    primary: 'bg-white/15 hover:bg-white/25 text-white border-white/30',
    secondary: 'bg-white/10 hover:bg-white/20 text-white/90 border-white/20',
    ghost: 'bg-transparent hover:bg-white/10 text-white/80 border-white/10'
  };

  const sizeConfig = sizes[size];
  const variantStyle = variants[variant] || variants.primary;

  const ButtonContent = () => (
    <span className={`flex items-center justify-center gap-2 ${sizeConfig.padding} ${sizeConfig.text} whitespace-nowrap font-medium`}>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </span>
  );

  const baseClasses = `
    inline-flex items-center justify-center
    ${sizeConfig.height}
    ${variantStyle}
    backdrop-blur-xl
    border
    rounded-full
    shadow-lg shadow-black/10
    transition-all duration-300 ease-out
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        <ButtonContent />
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      {...props}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default FluidButton;
