import React, { memo } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const ProjectCard = memo(({ project, onClick }) => {
  const { title, description, stack, role, year, url, repo, coverImage, category } = project;

  return (
    <div
      className="relative overflow-hidden cursor-pointer w-full max-w-sm bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white border border-white/20">
            {category}
          </span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs rounded-md bg-black/40 text-white/80">
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
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-white/80 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-white/80 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FiGithub className="w-3.5 h-3.5" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;

