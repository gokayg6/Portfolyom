import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiAward, FiBriefcase, FiHeart } from 'react-icons/fi';
import Beams from '../components/ios/Beams';
import GlassCard from '../components/ios/GlassCard';
import FluidButton from '../components/ios/FluidButton';
import { developers } from '../data/mock';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, scale: 0.92, y: 24 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 16 }
};

const pageTransition = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1]
};

const skills = {
  frontend: [
    'React / React Native',
    'Vue.js / Nuxt',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion / GSAP',
    'Next.js'
  ],
  backend: [
    'Node.js / Express',
    'Python / FastAPI',
    'PostgreSQL / MongoDB',
    'Redis / Caching',
    'AWS / GCP',
    'Docker / Kubernetes'
  ],
  tools: [
    'Git / GitHub',
    'Figma / Design',
    'CI/CD Pipelines',
    'Testing (Jest, Cypress)',
    'Agile / Scrum',
    'API Design'
  ]
};

const values = [
  {
    icon: FiAward,
    title: 'Kalite Odaklı',
    description: 'Her projede en yüksek standartları hedefliyoruz.'
  },
  {
    icon: FiBriefcase,
    title: 'Profesyonel',
    description: 'Zamanında teslimat ve şeffaf iletişim.'
  },
  {
    icon: FiHeart,
    title: 'Tutkulu',
    description: 'İşimizi seviyoruz ve bu her projemize yansıyor.'
  }
];

const About = () => {
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
          beamHeight={30}
          beamNumber={6}
          lightColor="#a78bfa"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative pt-32 pb-20 px-6 z-[2]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Hakkımızda
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              İki tutkulu geliştirici, sınırsız yaratıcılık.
              Modern web dünyasında fark yaratan projeler üretiyoruz.
            </p>
          </motion.div>

          {/* Developer Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <GlassCard className="p-8 h-full" blur="2xl" opacity={8}>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <div className="shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-lg opacity-50" />
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/20">
                          <img
                            src={dev.avatar}
                            alt={dev.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {dev.name}
                      </h2>
                      <p className="text-blue-400 font-medium mb-3">
                        {dev.role}
                      </p>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {dev.bio}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dev.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Skills Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Teknik Yetenekler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(skills).map(([category, items], catIndex) => (
                <GlassCard
                  key={category}
                  className="p-6"
                  blur="xl"
                  opacity={8}
                >
                  <h3 className="text-lg font-semibold text-white mb-4 capitalize">
                    {category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : 'Araçlar'}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((skill, i) => (
                      <motion.li
                        key={skill}
                        className="flex items-center gap-3 text-white/70 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <FiCheck className="w-4 h-4 text-green-400 shrink-0" />
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Değerlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <GlassCard
                  key={value.title}
                  className="p-6 text-center"
                  blur="xl"
                  opacity={8}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <value.icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {value.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="inline-block p-8 md:p-12" blur="2xl" opacity={10}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Birlikte Çalışalım
              </h2>
              <p className="text-white/60 mb-6 max-w-md">
                Projeniz için doğru ekibi buldunuz.
                Hemen iletişime geçin!
              </p>
              <Link to="/contact">
                <FluidButton variant="secondary" size="lg">
                  İletişime Geç
                </FluidButton>
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default About;
