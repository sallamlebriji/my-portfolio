import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase, MapPin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import profileData from '../data/profile.json';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
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
              {t('about.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <img
                    src={profileData.personal.avatar}
                    alt={profileData.personal.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                </motion.div>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  {t('about.contact_info')}
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: Mail, text: profileData.personal.email },
                    { icon: Phone, text: profileData.personal.phone },
                    { icon: MapPin, text: typeof profileData.personal.location === 'string' ? profileData.personal.location : profileData.personal.location[language] }
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center space-x-3">
                      <Icon size={18} className="text-cyan-500" />
                      <span className="text-slate-600 dark:text-slate-400">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Bio and Timeline */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  {t('about.my_journey')}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {typeof profileData.personal.bio === 'string' ? profileData.personal.bio : profileData.personal.bio[language]}
                </p>
              </div>

              {/* Experience Timeline */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Briefcase className="text-cyan-500" size={24} />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {t('about.experience')}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {profileData.experience.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      variants={itemVariants}
                      className="relative pl-8 border-l-2 border-cyan-200 dark:border-cyan-800"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full"></div>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h4 className="font-semibold text-slate-900 dark:text-white">
                          {typeof exp.position === 'string' ? exp.position : exp.position[language]}
                        </h4>
                        <p className="text-cyan-600 dark:text-cyan-400 font-medium">
                          {typeof exp.company === 'string' ? exp.company : exp.company[language]}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          {typeof exp.period === 'string' ? exp.period : exp.period[language]}
                        </p>
                        {exp.description && (
                          <p className="text-slate-600 dark:text-slate-400">
                            {typeof exp.description === 'string' ? exp.description : exp.description[language]}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <GraduationCap className="text-cyan-500" size={24} />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {t('about.education')}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {profileData.education.map((edu) => (
                    <motion.div
                      key={edu.id}
                      variants={itemVariants}
                      className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {typeof edu.degree === 'string' ? edu.degree : edu.degree[language]}
                      </h4>
                      <p className="text-cyan-600 dark:text-cyan-400">
                        {typeof edu.school === 'string' ? edu.school : edu.school[language]}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {edu.year}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;