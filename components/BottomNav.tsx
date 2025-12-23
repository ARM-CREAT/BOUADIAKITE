
import React from 'react';
import { Home, FileText, Video, Heart, MessageSquareQuote } from 'lucide-react';
import { AppSection } from '../types';
import { translations, Language } from '../translations';

interface BottomNavProps {
  currentSection: AppSection;
  setSection: (s: AppSection) => void;
  lang: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentSection, setSection, lang }) => {
  const t = translations[lang];
  const items = [
    { id: AppSection.HOME, label: t.home, icon: Home },
    { id: AppSection.PROGRAM, label: t.program, icon: FileText },
    { id: AppSection.SOCIAL_CONCERNS, label: t.socialConcerns, icon: MessageSquareQuote },
    { id: AppSection.MEDIA, label: t.media, icon: Video },
    { id: AppSection.DONATE, label: t.donate, icon: Heart },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className={`flex justify-around items-center h-16 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all relative ${
              currentSection === item.id ? 'text-mali-green' : 'text-gray-400'
            }`}
          >
            <item.icon size={22} className={currentSection === item.id ? 'scale-110' : ''} />
            <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
            {currentSection === item.id && (
              <div className="w-1 h-1 bg-mali-green rounded-full absolute bottom-1"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
