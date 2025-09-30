import React, { createContext, useContext, useEffect, useState } from 'react';

interface LanguageContextType {
  language: 'fr' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traductions
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    'nav.download_cv': 'Télécharger CV',
    
    // Hero Section
    'hero.greeting': 'Salut, je suis',
    'hero.contact_me': 'Me contacter',
    'hero.download_cv': 'Télécharger CV',
    
    // About Section
    'about.title': 'À propos de moi',
    'about.subtitle': 'Développeur passionné',
    'about.contact_info': 'Informations de contact',
    'about.my_journey': 'Mon parcours',
    'about.experience': 'Expérience',
    'about.education': 'Formation',
    
    // Skills Section
    'skills.title': 'Compétences & Expertise',
    'skills.subtitle': 'Un aperçu complet de mes compétences techniques et de mes niveaux de maîtrise dans différents domaines.',
    'skills.overview': 'Aperçu des compétences',
    'skills.ready_challenges': 'Prêt à relever des défis complexes',
    'skills.ready_description': 'Avec une expertise couvrant le machine learning, la visualisation de données et les technologies cloud, je suis équipé pour transformer vos données en insights exploitables et stimuler l\'innovation.',
    
    // Projects Section
    'projects.title': 'Projets en vedette',
    'projects.subtitle': 'Une vitrine de mes projets.',
    'projects.filter_by': 'Filtrer par :',
    'projects.all': 'Tous',
    'projects.code': 'Code',
    'projects.demo': 'Démo',
    'projects.interested_more': 'Intéressé par plus de mon travail ?',
    'projects.view_all_github': 'Voir tous les projets sur GitHub',
    
    // Contact Section
    'contact.title': 'Travaillons ensemble',
    'contact.subtitle': 'Prêt à transformer les données en insights ? Discutons de la façon dont nous pouvons collaborer sur votre prochain projet.',
    'contact.get_in_touch': 'Entrer en contact',
    'contact.description': 'Je suis toujours intéressé par de nouvelles opportunités et des projets passionnants. Que vous ayez besoin d\'aide avec le machine learning, l\'analyse de données ou le développement IA, j\'aimerais avoir de vos nouvelles.',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.location': 'Localisation',
    'contact.follow_me': 'Suivez-moi',
    'contact.form.name': 'Nom complet',
    'contact.form.name_placeholder': 'Votre nom',
    'contact.form.email': 'Adresse email',
    'contact.form.email_placeholder': 'votre.email@exemple.com',
    'contact.form.subject': 'Sujet',
    'contact.form.subject_placeholder': 'De quoi s\'agit-il ?',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Parlez-moi de votre projet ou de votre demande...',
    'contact.form.send': 'Envoyer le message',
    
    // Footer Section
    'footer.tagline': 'Transformer les données en insights, un algorithme à la fois.',
    'footer.copyright': 'Tous droits réservés.',
    'footer.role': 'Data Scientist & Développeur Full Stack',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.cancel': 'Annuler',
    'common.save': 'Enregistrer',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.close': 'Fermer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cv': 'CV',
    'nav.download_cv': 'Download CV',
    
    // Hero Section
    'hero.greeting': 'Hi, I\'m',
    'hero.contact_me': 'Contact Me',
    'hero.download_cv': 'Download CV',
    
    // About Section
    'about.title': 'About Me',
    'about.subtitle': 'Passionate Developer',
    'about.contact_info': 'Contact Information',
    'about.my_journey': 'My Journey',
    'about.experience': 'Experience',
    'about.education': 'Education',
    
    // Skills Section
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': 'A comprehensive overview of my technical skills and proficiency levels across various domains.',
    'skills.overview': 'Skill Overview',
    'skills.ready_challenges': 'Ready to Tackle Complex Challenges',
    'skills.ready_description': 'With expertise spanning machine learning, data visualization, and cloud technologies, I\'m equipped to transform your data into actionable insights and drive innovation.',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A showcase of my projects.',
    'projects.filter_by': 'Filter by:',
    'projects.all': 'All',
    'projects.code': 'Code',
    'projects.demo': 'Demo',
    'projects.interested_more': 'Interested in seeing more of my work?',
    'projects.view_all_github': 'View All Projects on GitHub',
    
    // Contact Section
    'contact.title': 'Let\'s Work Together',
    'contact.subtitle': 'Ready to turn data into insights? Let\'s discuss how we can collaborate on your next project.',
    'contact.get_in_touch': 'Get in Touch',
    'contact.description': 'I\'m always interested in new opportunities and exciting projects. Whether you need help with machine learning, data analysis, or AI development, I\'d love to hear from you.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.follow_me': 'Follow Me',
    'contact.form.name': 'Full Name',
    'contact.form.name_placeholder': 'Your name',
    'contact.form.email': 'Email Address',
    'contact.form.email_placeholder': 'your.email@example.com',
    'contact.form.subject': 'Subject',
    'contact.form.subject_placeholder': 'What\'s this about?',
    'contact.form.message': 'Message',
    'contact.form.message_placeholder': 'Tell me about your project or inquiry...',
    'contact.form.send': 'Send Message',
    
    // Footer Section
    'footer.tagline': 'Transforming data into insights, one algorithm at a time.',
    'footer.copyright': 'All rights reserved.',
    'footer.role': 'Data Scientist & Full Stack Developer',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as 'fr' | 'en';
      return savedLanguage || 'fr';
    }
    return 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
