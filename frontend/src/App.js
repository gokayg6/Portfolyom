import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';

// iOS Components
import GlassNavbar from './components/ios/GlassNavbar';
import StaggeredMenu from './components/ios/StaggeredMenu';
import Footer from './components/ios/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

// Data
import { navItems, socialLinks } from './data/mock';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App min-h-screen bg-[#0a0a0f]">
      <BrowserRouter>
        {/* Glass Navbar - Desktop */}
        <GlassNavbar items={navItems} />

        {/* Staggered Menu - Mobile/Overlay */}
        <StaggeredMenu
          items={navItems}
          socialItems={socialLinks}
          position="right"
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          colors={['#6366f1', '#8b5cf6']}
          accentColor="#60A5FA"
          isFixed={true}
          closeOnClickAway={true}
        />

        {/* Main Content */}
        <AnimatedRoutes />

        {/* Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
