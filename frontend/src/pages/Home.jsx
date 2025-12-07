import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiLayers, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Beams from '../components/ios/Beams';
import DeveloperCard from '../components/ios/DeveloperCard';
import FluidButton from '../components/ios/FluidButton';
import GlassCard from '../components/ios/GlassCard';
import { developers, projects } from '../data/mock';

const pageVariants = {
  initial: { opacity: 0, scale: 0.92, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 16 }
};

const pageTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1]
};

const stats = [
  { icon: FiCode, label: 'Projeler', value: `${projects.length}+` },
  { icon: FiLayers, label: 'Teknoloji', value: '15+' },
  { icon: FiUsers, label: 'Müşteri', value: '25+' }
];

const Home = () => {
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
          beamWidth={0.3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-transparent to-[#0a0a0f] pointer-events-none z-[1]" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 z-[2]">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Çalışmaya Hazırız
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Dijital Deneyimler
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tasarlıyoruz
              </span>
            </motion.h1>

            <motion.p
              className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Modern web teknolojileri ve yaratıcı tasarımlarla hayallerinizi
              gerçeğe dönüştürüyoruz. Full-stack ve frontend uzmanlığımızla
              yanınızdayız.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/projects">
                <FluidButton
                  variant="secondary"
                  size="lg"
                  icon={<FiArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Projelerimizi Gör
                </FluidButton>
              </Link>
              <Link to="/contact">
                <FluidButton variant="ghost" size="lg">
                  İletişime Geç
                </FluidButton>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {stats.map((stat, i) => (
              <GlassCard
                key={stat.label}
                className="p-4 text-center"
                blur="xl"
                opacity={8}
                hover={false}
              >
                <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/50 text-xs">{stat.label}</div>
              </GlassCard>
            ))}
          </motion.div>

          {/* Developer Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {developers.map((dev, index) => (
              <DeveloperCard key={dev.id} developer={dev} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Öne Çıkan Projeler
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Son dönemde gerçekleştirdiğimiz bazı projelerimize göz atın
            </p>
          </motion.div>

          {/* Project Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="overflow-hidden h-full" blur="xl" opacity={8}>
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/projects">
              <FluidButton
                variant="primary"
                size="md"
                icon={<FiArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Tüm Projeleri Gör
              </FluidButton>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8 md:p-12 text-center" blur="2xl" opacity={10}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Projenizi Hayata Geçirelim
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                Fikrinizi dinlemek ve size özel çözümler sunmak için sabırsızlanıyoruz.
                Hemen iletişime geçin!
              </p>
              <Link to="/contact">
                <FluidButton variant="secondary" size="lg">
                  Bize Ulaşın
                </FluidButton>
              </Link>
            </motion.div>
          </GlassCard>
        </div>
      </section>
    </motion.main>
  );
};

export default Home;
