import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiBriefcase } from 'react-icons/fi';
import GlassCard from './GlassCard';
import FluidButton from './FluidButton';

const DeveloperCard = ({ developer, index = 0 }) => {
  const { name, role, avatar, bio, techStack, social, experience, location } = developer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }}
    >
      <GlassCard
        className="p-6 md:p-8 max-w-md w-full"
        blur="2xl"
        opacity={8}
      >
        {/* Avatar & Basic Info */}
        <div className="flex flex-col items-center text-center mb-6">
          {/* Avatar with gradient border */}
          <motion.div
            className="relative mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-[3px] animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-[#0a0a0f]" />
          </motion.div>

          {/* Name & Role */}
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
            {name}
          </h3>
          <p className="text-blue-300/80 font-medium text-sm">
            {role}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-4 mt-3 text-white/50 text-xs">
            <span className="flex items-center gap-1">
              <FiBriefcase className="w-3 h-3" />
              {experience}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin className="w-3 h-3" />
              {location}
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-white/70 text-sm leading-relaxed text-center mb-6">
          {bio}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-3 text-center">
            Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          <FluidButton
            variant="ghost"
            size="sm"
            href={social.github}
            icon={<FiGithub className="w-4 h-4" />}
            className="!rounded-xl !p-2.5"
          />
          <FluidButton
            variant="ghost"
            size="sm"
            href={social.linkedin}
            icon={<FiLinkedin className="w-4 h-4" />}
            className="!rounded-xl !p-2.5"
          />
          <FluidButton
            variant="ghost"
            size="sm"
            href={`mailto:${social.email}`}
            icon={<FiMail className="w-4 h-4" />}
            className="!rounded-xl !p-2.5"
          />
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default DeveloperCard;
