
import React, { useState } from 'react';
import { Menu, X, Smartphone, Home, Calendar, Newspaper, Heart, LayoutDashboard, FileText, Shield, Video, MessageCircle, Globe, ChevronDown } from 'lucide-react';
import { AppSection } from '../types';
import { PARTY_ACRONYM } from '../constants';
import { translations, Language } from '../translations';

interface NavbarProps {
  currentSection: AppSection;
  setSection: (s: AppSection) => void;
  onInstall: () => void;
  lang: Language;
  setLang: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSection, setSection, onInstall, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: AppSection.HOME, label: t.home, icon: Home },
    { id: AppSection.PROGRAM, label: t.program, icon: FileText },
    { id: AppSection.STATUTES, label: t.statutes, icon: Shield },
    { id: AppSection.MEDIA, label: t.media, icon: Video },
    { id: AppSection.EVENTS, label: t.events, icon: Calendar },
    { id: AppSection.NEWS, label: t.news, icon: Newspaper },
    { id: AppSection.DONATE, label: t.donate, icon: Heart },
    { id: AppSection.CONTACT, label: t.contact, icon: MessageCircle },
    { id: AppSection.ADMIN, label: t.admin, icon: LayoutDashboard },
  ];

  const languages = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'ar', label: 'عربي' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-mali-green text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
              onClick={() => setSection(AppSection.HOME)}
            >
              <div className="w-10 h-10 bg-mali-yellow rounded-full flex items-center justify-center font-bold text-mali-green text-xl border-2 border-white shadow-md">
                {PARTY_ACRONYM[0]}
              </div>
              <span className="font-bold text-lg hidden sm:block">A.R.M</span>
            </div>
            <div className="hidden lg:block">
              <div className={`ml-10 flex items-baseline space-x-1 ${lang === 'ar' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setSection(item.id); setIsOpen(false); }}
                    className={`px-3 py-2 rounded-md text-[11px] font-black transition-colors uppercase tracking-tight ${
                      currentSection === item.id ? 'bg-mali-yellow text-mali-green' : 'hover:bg-green-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLang(!showLang)}
                className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-black/30 transition-all uppercase"
              >
                <Globe size={14} /> {lang} <ChevronDown size={12} />
              </button>
              {showLang && (
                <div className={`absolute top-full mt-2 w-24 bg-white rounded-xl shadow-2xl overflow-hidden z-50 ${lang === 'ar' ? 'left-0' : 'right-0'}`}>
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code as Language); setShowLang(false); }}
                      className={`w-full text-left px-4 py-3 text-xs font-black hover:bg-gray-50 flex items-center justify-between ${lang === l.code ? 'text-mali-green bg-green-50' : 'text-gray-800'}`}
                    >
                      {l.label}
                      {lang === l.code && <div className="w-1.5 h-1.5 bg-mali-green rounded-full"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={onInstall}
              className="hidden sm:flex items-center gap-2 bg-white text-mali-green px-4 py-2 rounded-full text-[10px] font-black hover:bg-mali-yellow transition-all uppercase tracking-widest"
            >
              <Smartphone size={14} /> {t.install}
            </button>
            
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-600 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-mali-green border-t border-green-600 shadow-xl overflow-y-auto max-h-[80vh]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-start">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); setIsOpen(false); }}
                className={`block w-full text-start px-4 py-4 rounded-md text-sm font-bold flex items-center gap-4 ${
                  currentSection === item.id ? 'bg-mali-yellow text-mali-green' : 'hover:bg-green-600'
                } ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
