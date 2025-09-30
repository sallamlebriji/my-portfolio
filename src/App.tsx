import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <Loader key="loader" />
            ) : (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar />
                <main>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Contact />
                </main>
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;