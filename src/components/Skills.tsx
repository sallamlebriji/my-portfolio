import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import skillsData from '../data/skills.json';

const Skills: React.FC = () => {
  const { t } = useLanguage();
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

  // Prepare data for radar chart
  const radarData = skillsData.categories.map(category => ({
    category: category.name,
    level: Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)
  }));

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-800">
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
              {t('skills.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
              {t('skills.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Radar Chart */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8 text-center">
                {t('skills.overview')}
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid className="stroke-slate-200 dark:stroke-slate-700" />
                    <PolarAngleAxis 
                      dataKey="category" 
                      className="text-slate-600 dark:text-slate-400 text-sm"
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      className="text-slate-400 text-xs"
                      tickCount={5}
                    />
                    <Radar
                      name="Skills"
                      dataKey="level"
                      stroke="#06b6d4"
                      fill="rgba(6, 182, 212, 0.1)"
                      strokeWidth={3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skills Detail */}
            <motion.div variants={itemVariants} className="space-y-8">
              {skillsData.categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    {category.name}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ 
                              duration: 1.5, 
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                              ease: 'easeOut'
                            }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{t('skills.ready_challenges')}</h3>
              <p className="text-cyan-100 max-w-2xl mx-auto">
                {t('skills.ready_description')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;