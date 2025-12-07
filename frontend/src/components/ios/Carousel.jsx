import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import GlassCard from './GlassCard';

const Carousel = ({
  items = [],
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  round = false,
  renderItem
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const autoplayRef = useRef(null);

  const totalItems = items.length;

  useEffect(() => {
    if (autoplay && !isPaused && totalItems > 1) {
      autoplayRef.current = setInterval(() => {
        goToNext();
      }, autoplayDelay);
    }
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, isPaused, currentIndex, autoplayDelay, totalItems]);

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= totalItems - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return loop ? totalItems - 1 : prev;
      }
      return prev - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getVisibleItems = () => {
    const visibleCount = 3;
    const result = [];
    for (let i = -1; i <= 1; i++) {
      let index = currentIndex + i;
      if (loop) {
        if (index < 0) index = totalItems + index;
        if (index >= totalItems) index = index - totalItems;
      }
      if (index >= 0 && index < totalItems) {
        result.push({ item: items[index], position: i, originalIndex: index });
      }
    }
    return result;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          {getVisibleItems().map(({ item, position, originalIndex }) => (
            <motion.div
              key={item.id || originalIndex}
              className="absolute"
              style={{ width: baseWidth }}
              initial={{
                scale: position === 0 ? 0.8 : 0.6,
                opacity: 0,
                x: position * (baseWidth * 0.6),
                zIndex: position === 0 ? 10 : 5
              }}
              animate={{
                scale: position === 0 ? 1 : 0.75,
                opacity: position === 0 ? 1 : 0.5,
                x: position * (baseWidth * 0.65),
                zIndex: position === 0 ? 10 : 5,
                filter: position === 0 ? 'blur(0px)' : 'blur(2px)'
              }}
              exit={{
                scale: 0.6,
                opacity: 0,
                x: position * (baseWidth * 0.6)
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25
              }}
            >
              {renderItem ? renderItem(item, originalIndex) : (
                <GlassCard className="p-6">
                  {item.title || 'Item'}
                </GlassCard>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <motion.button
          onClick={goToPrev}
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.button
          onClick={goToNext}
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default Carousel;
