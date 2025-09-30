import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import profileData from '../data/profile.json';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: 'https://github.com/sallamlebriji', 
      label: 'GitHub',
      color: 'hover:text-slate-700 dark:hover:text-slate-300'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/sallam-lebriji-875292197/', 
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Twitter, 
      href: '#', 
      label: 'Twitter',
      color: 'hover:text-sky-500'
    },
    { 
      icon: MessageSquare, 
      href: 'mailto:sallam.lebriji@gmail.com', 
      label: 'Kaggle',
      color: 'hover:text-cyan-500'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                  {t('contact.get_in_touch')}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  {t('contact.description')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: t('contact.email'),
                    value: profileData.personal.email,
                    href: `mailto:${profileData.personal.email}`
                  },
                  {
                    icon: Phone,
                    label: t('contact.phone'),
                    value: profileData.personal.phone,
                    href: `tel:${profileData.personal.phone}`
                  },
                  {
                    icon: MapPin,
                    label: t('contact.location'),
                    value: typeof profileData.personal.location === 'string' ? profileData.personal.location : profileData.personal.location[language],
                    href: '#'
                  }
                ].map(({ icon: Icon, label, value, href }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {label}
                      </p>
                      <a
                        href={href}
                        className="text-slate-900 dark:text-white font-medium hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                      >
                        {value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {t('contact.follow_me')}
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-white dark:bg-slate-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-slate-500 dark:text-slate-400 ${color}`}
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t('contact.form.name')}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200"
                      placeholder={t('contact.form.name_placeholder')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {t('contact.form.email')}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200"
                      placeholder={t('contact.form.email_placeholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('contact.form.subject')}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200"
                    placeholder={t('contact.form.subject_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-all duration-200 resize-none"
                    placeholder={t('contact.form.message_placeholder')}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>{t('contact.form.send')}</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;