import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Beams = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = '#ffffff',
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0
}) => {
  const containerRef = useRef(null);

  const beams = Array.from({ length: beamNumber }, (_, i) => ({
    id: i,
    x: (100 / beamNumber) * i + Math.random() * 10,
    delay: Math.random() * 2,
    duration: speed + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.3
  }));

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />
      
      {/* Animated beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-0"
          style={{
            left: `${beam.x}%`,
            width: `${beamWidth}px`,
            height: `${beamHeight}vh`,
            background: `linear-gradient(180deg, ${lightColor}00 0%, ${lightColor}${Math.floor(beam.opacity * 255).toString(16).padStart(2, '0')} 50%, ${lightColor}00 100%)`,
            filter: `blur(${noiseIntensity}px)`,
            transform: `scaleY(${scale})`
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, beam.opacity, beam.opacity, 0]
          }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Additional ambient glow spots */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default Beams;
