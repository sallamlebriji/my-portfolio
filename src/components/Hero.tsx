import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import profileData from '../data/profile.json';
import cvPdf from '../../docs/CV LEBRIJI SALLAM V12.pdf';

const Hero: React.FC = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const { t, language } = useLanguage();
  
  const typewriterWords = ['Machine Learning', 'Deep Learning', 'AI Development', 'Data Analytics', 'Cloud Computing','Full Stack Developer'];
  
  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: number;

    const typeWriter = () => {
      const currentWord = typewriterWords[wordIndex];
      
      if (isDeleting) {
        setTypewriterText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypewriterText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typewriterWords.length;
      }

      timeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
    };

    typeWriter();
    return () => clearTimeout(timeout);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(6, 182, 212, 0.7)',
                    '0 0 0 10px rgba(6, 182, 212, 0)',
                    '0 0 0 0 rgba(6, 182, 212, 0)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl"
              >
                <img
                  src={profileData.personal.avatar}
                  alt={profileData.personal.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-full border-2 border-dashed border-cyan-300 dark:border-cyan-700"
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t('hero.greeting')}{' '}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                {profileData.personal.name}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-2xl sm:text-3xl text-slate-700 dark:text-slate-300 mb-6"
            >
              {typeof profileData.personal.title === 'string' ? profileData.personal.title : profileData.personal.title[language]}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl text-slate-600 dark:text-slate-400 mb-8 h-8"
            >
              {typewriterText}
              <span className="animate-pulse text-cyan-500">|</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto"
            >
              {typeof profileData.personal.tagline === 'string' ? profileData.personal.tagline : profileData.personal.tagline[language]}
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.contact_me')}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 rounded-lg font-semibold hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors duration-200"
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('hero.download_cv')}
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex justify-center space-x-6 mb-16"
          >
            {[
              { icon: Github, href: 'https://github.com/sallamlebriji', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/sallam-lebriji-875292197/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:sallam.lebriji@gmail.com', label: 'Email' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                href={href}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 text-slate-600 dark:text-slate-400 hover:text-cyan-500"
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToAbout}
          className="text-slate-400 hover:text-cyan-500 transition-colors duration-200"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;