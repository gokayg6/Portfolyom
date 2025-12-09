import React from 'react';
import GlassSurface from './GlassSurface';

const GlassSurfaceButton = ({
    children,
    size = 'md',
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
        sm: { height: 40, padding: 'px-4' },
        md: { height: 48, padding: 'px-6' },
        lg: { height: 56, padding: 'px-8' },
        xl: { height: 64, padding: 'px-10' }
    };

    const sizeConfig = sizes[size];

    return (
        <GlassSurface
            width="auto"
            height={sizeConfig.height}
            borderRadius={50}
            backgroundOpacity={0.1}
            saturation={1}
            borderWidth={0.07}
            brightness={50}
            opacity={0.93}
            blur={11}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            onClick={onClick}
            href={href}
            disabled={disabled}
            as={type === 'submit' ? 'button' : 'div'}
            className={`inline-flex ${className}`}
            style={{ width: 'auto' }}
            {...props}
        >
            <span className={`flex items-center gap-2 ${sizeConfig.padding} whitespace-nowrap`}>
                {icon && iconPosition === 'left' && icon}
                {children}
                {icon && iconPosition === 'right' && icon}
            </span>
        </GlassSurface>
    );
};

export default GlassSurfaceButton;
