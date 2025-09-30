import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Download, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import cvPdf from '../../docs/CV LEBRIJI SALLAM V12.pdf';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent"
          >
            LS
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -2 }}
                onClick={() => scrollToSection(item.href)}
                className="text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.button>
            ))}
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-1"
                title={language === 'fr' ? 'Switch to English' : 'Passer au français'}
              >
                <Languages size={18} />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium flex items-center space-x-2"
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                <span>{t('nav.cv')}</span>
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-1"
              title={language === 'fr' ? 'Switch to English' : 'Passer au français'}
            >
              <Languages size={18} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ x: 10 }}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-slate-700 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.a
              whileHover={{ scale: 1.02 }}
              className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={18} />
              <span>{t('nav.download_cv')}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;