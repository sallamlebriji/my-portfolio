import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import projectsData from '../data/projects.json';

const Projects: React.FC = () => {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState(t('projects.all'));

  const resolveText = (value: string | { en: string; fr: string }) =>
    typeof value === 'string' ? value : value[language];

  // Reset category when language changes to avoid mismatch between localized labels
  useEffect(() => {
    setSelectedCategory(t('projects.all'));
  }, [language, t]);

  const categories = [
    t('projects.all'),
    ...Array.from(new Set(projectsData.projects.map(p => resolveText(p.category))))
  ];

  const filteredProjects = selectedCategory === t('projects.all')
    ? projectsData.projects
    : projectsData.projects.filter(p => resolveText(p.category) === selectedCategory);

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
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
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
              {t('projects.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 mb-4 sm:mb-0">
              <Filter size={20} />
              <span className="font-medium">{t('projects.filter_by')}</span>
            </div>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={project.image}
                    alt={resolveText(project.title)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm font-medium">{resolveText(project.category)}</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {resolveText(project.title)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {resolveText(project.description)}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
                    >
                      <Github size={16} />
                      <span>{t('projects.code')}</span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
                    >
                      <ExternalLink size={16} />
                      <span>{t('projects.demo')}</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {t('projects.interested_more')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              {t('projects.view_all_github')}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;