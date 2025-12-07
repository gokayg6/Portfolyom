import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';
import Beams from '../components/ios/Beams';
import GlassCard from '../components/ios/GlassCard';
import FluidButton from '../components/ios/FluidButton';
import FlowingMenu from '../components/ios/FlowingMenu';
import ProjectCard from '../components/ios/ProjectCard';
import { projects, categories, developers } from '../data/mock';

const pageVariants = {
  initial: { opacity: 0, scale: 0.92, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 16 }
};

const pageTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1]
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const getDeveloperName = (devId) => {
    const dev = developers.find((d) => d.id === devId);
    return dev ? dev.name : '';
  };

  return (
    <motion.main
      className="relative min-h-screen overflow-hidden bg-[#0a0a0f]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {/* Background - ReactBits Beams */}
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#60a5fa"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative pt-32 pb-20 px-6 z-[2]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Projelerimiz
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Modern teknolojiler ve yaratıcı çözümlerle hayata geçirdiğimiz projeler
            </p>
          </motion.div>

          {/* Layout: Sidebar + Grid */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Sidebar */}
            <motion.aside
              className="lg:w-64 shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-4 lg:sticky lg:top-28" blur="xl" opacity={8} hover={false}>
                <h3 className="text-white/50 text-xs uppercase tracking-wider mb-4 px-4">
                  Kategoriler
                </h3>
                <FlowingMenu
                  items={categories}
                  selectedId={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </GlassCard>
            </motion.aside>

            {/* Projects Grid */}
            <div className="flex-1">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        delay: index * 0.05,
                        type: 'spring',
                        stiffness: 200,
                        damping: 25
                      }}
                    >
                      <ProjectCard
                        project={project}
                        index={index}
                        onClick={() => setSelectedProject(project)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-white/50">Bu kategoride henüz proje yok.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <GlassCard className="overflow-hidden" blur="2xl" opacity={15} hover={false}>
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>

                {/* Cover Image */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedProject.coverImage}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-md text-white mb-2">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/60">
                    <span>Developer: <span className="text-white">{getDeveloperName(selectedProject.developer)}</span></span>
                    <span>Rol: <span className="text-white">{selectedProject.role}</span></span>
                    <span>Yıl: <span className="text-white">{selectedProject.year}</span></span>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-white/50 text-xs uppercase tracking-wider mb-3">
                      Teknolojiler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-lg bg-white/10 text-white/80 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.url && (
                      <FluidButton
                        variant="secondary"
                        size="md"
                        href={selectedProject.url}
                        icon={<FiExternalLink className="w-4 h-4" />}
                      >
                        Canlı Demo
                      </FluidButton>
                    )}
                    {selectedProject.repo && (
                      <FluidButton
                        variant="ghost"
                        size="md"
                        href={selectedProject.repo}
                        icon={<FiGithub className="w-4 h-4" />}
                      >
                        GitHub
                      </FluidButton>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default Projects;
