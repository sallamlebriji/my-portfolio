import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Back to Top Button */}
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ArrowUp size={20} />
          </motion.button>

          <div className="pt-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                LEBRIJI Sallam
              </h3>
              <p className="text-slate-400 mt-2">{t('footer.role')}</p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"
            />

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-slate-400"
            >
              <span>© {new Date().getFullYear()} LEBRIJI Sallam. {t('footer.copyright')}</span>
              <span className="hidden sm:inline">•</span>
            
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-slate-500 text-sm mt-4 italic"
            >
              "{t('footer.tagline')}"
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;