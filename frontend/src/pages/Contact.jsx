import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Beams from '../components/ios/Beams';
import GlassCard from '../components/ios/GlassCard';
import FluidButton from '../components/ios/FluidButton';
import { developers } from '../data/mock';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const pageTransition = {
  duration: 0.3,
  ease: 'easeOut'
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showToast('error', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('error', 'Geçerli bir e-posta adresi girin.');
      return;
    }

    setIsSubmitting(true);

    // Mock API call - simulating backend
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Success
      showToast('success', 'Mesajınız başarıyla gönderildi!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      showToast('error', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
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
          beamHeight={30}
          beamNumber={6}
          lightColor="#34d399"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f] pointer-events-none z-[1]" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed top-24 right-6 z-50"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <GlassCard
              className={`px-5 py-4 flex items-center gap-3 ${
                toast.type === 'success' ? 'border-green-500/30' : 'border-red-500/30'
              }`}
              blur="xl"
              opacity={20}
              hover={false}
            >
              {toast.type === 'success' ? (
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <FiCheck className="w-4 h-4 text-green-400" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <FiAlertCircle className="w-4 h-4 text-red-400" />
                </div>
              )}
              <span className="text-white text-sm">{toast.message}</span>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

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
              İletişim
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Projenizi konuşmak veya sadece merhaba demek için bize ulaşın.
              En kısa sürede dönüş yaparız!
            </p>
          </motion.div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-8" blur="2xl" opacity={10} hover={false}>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Mesaj Gönderin
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Adınız
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/60 text-sm mb-2">
                      Mesajınız
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="Projeniz hakkında bize bilgi verin..."
                    />
                  </div>

                  {/* Submit */}
                  <FluidButton
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    icon={<FiSend className="w-4 h-4" />}
                    iconPosition="right"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                  </FluidButton>
                </form>
              </GlassCard>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Quick Contact */}
              <GlassCard className="p-6" blur="xl" opacity={8}>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Hızlı İletişim
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <FiMail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">E-posta</p>
                      <p className="text-white">hello@gokay-mithat.dev</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <FiMapPin className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Konum</p>
                      <p className="text-white">Istanbul, Turkey</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Team Members */}
              {developers.map((dev) => (
                <GlassCard key={dev.id} className="p-6" blur="xl" opacity={8}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden">
                      <img
                        src={dev.avatar}
                        alt={dev.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{dev.name}</h4>
                      <p className="text-white/50 text-sm">{dev.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={dev.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                    </a>
                    <a
                      href={dev.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${dev.social.email}`}
                      className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <FiMail className="w-4 h-4" />
                    </a>
                  </div>
                </GlassCard>
              ))}

              {/* Social Links */}
              <GlassCard className="p-6" blur="xl" opacity={8}>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Sosyal Medya
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <FaTwitter className="w-5 h-5" />
                    <span className="text-sm">Twitter</span>
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Contact;
