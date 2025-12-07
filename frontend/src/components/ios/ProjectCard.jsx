import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import GlassCard from './GlassCard';
import FluidButton from './FluidButton';

const ProjectCard = ({ project, index = 0, onClick }) => {
  const { title, description, stack, role, year, url, repo, coverImage, category } = project;

  return (
    <GlassCard
      className="overflow-hidden cursor-pointer w-full max-w-sm"
      blur="xl"
      opacity={10}
      onClick={onClick}
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
            {category}
          </span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs rounded-md bg-black/30 backdrop-blur-md text-white/80">
            {year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Role */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {title}
          </h3>
          <span className={`
            px-2 py-0.5 text-xs rounded-md shrink-0
            ${role === 'Full Stack' 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }
          `}>
            {role}
          </span>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm line-clamp-2 mb-4">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-white/50 border border-white/10"
            >
              {tech}
            </span>
          ))}
          {stack.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-white/50">
              +{stack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {url && (
            <FluidButton
              variant="ghost"
              size="sm"
              href={url}
              icon={<FiExternalLink className="w-3.5 h-3.5" />}
              className="flex-1 !text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              Demo
            </FluidButton>
          )}
          {repo && (
            <FluidButton
              variant="ghost"
              size="sm"
              href={repo}
              icon={<FiGithub className="w-3.5 h-3.5" />}
              className="flex-1 !text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              Code
            </FluidButton>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;
