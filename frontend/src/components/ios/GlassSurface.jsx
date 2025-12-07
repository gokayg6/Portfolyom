import React from 'react';

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 50,
  className = '',
  style = {},
  onClick,
  disabled = false,
  as = 'div',
  href
}) => {
  const getContainerStyles = () => {
    return {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px) saturate(1.5)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: `
        inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
        inset 0 -1px 0 0 rgba(255, 255, 255, 0.05),
        0 4px 24px rgba(0, 0, 0, 0.15)
      `
    };
  };

  const Component = href ? 'a' : as === 'button' ? 'button' : 'div';

  return (
    <Component
      className={`relative flex items-center justify-center overflow-hidden transition-all duration-200 ease-out cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98] hover:bg-white/10'} ${className}`}
      style={getContainerStyles()}
      onClick={disabled ? undefined : onClick}
      href={href}
      disabled={disabled}
    >
      <div className="w-full h-full flex items-center justify-center px-6 py-3 rounded-[inherit] relative z-10 text-white font-medium">
        {children}
      </div>
    </Component>
  );
};

export default GlassSurface;
