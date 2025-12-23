
import React from 'react';
import { PARTY_NAME } from '../constants';
import { translations, Language } from '../translations';

interface PoliticalProgramProps {
  pillars: any[];
  lang: Language;
}

const PoliticalProgram: React.FC<PoliticalProgramProps> = ({ pillars, lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  return (
    <div className={`max-w-5xl mx-auto py-12 px-6 ${isAr ? 'text-end' : 'text-start'}`}>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">{lang === 'fr' ? "Nos Objectifs Fondamentaux" : t.program}</h1>
        <p className="text-xl text-mali-green font-black uppercase tracking-wide">Déclaration d'Intention ARM</p>
        <div className="w-32 h-2 bg-mali-yellow mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((pillar, index) => (
          <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:border-mali-green transition-all relative overflow-hidden group">
            <div className={`flex items-center gap-6 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-mali-green group-hover:bg-mali-green group-hover:text-white transition-all">
                {React.cloneElement(pillar.icon, { size: 32 })}
              </div>
              <div className={isAr ? 'text-right' : 'text-left'}>
                <span className="text-[10px] font-black text-mali-yellow uppercase tracking-widest">Objectif {index + 1}</span>
                <h3 className="text-lg font-black text-gray-800 uppercase leading-tight">{pillar.title}</h3>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[4rem] flex items-center justify-center -z-0 opacity-50">
               <span className="text-4xl font-black text-gray-100">{index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* VISION BOX (Extrait du document) */}
      <div className="mt-20 bg-gray-900 text-white p-12 rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
         <div className="relative z-10">
           <h2 className="text-3xl font-black uppercase mb-6 tracking-tighter">{t.visionTitle}</h2>
           <p className="text-2xl font-black italic text-mali-yellow leading-relaxed max-w-3xl mx-auto">
             "{t.visionDesc}"
           </p>
           <p className="text-xs font-bold text-gray-400 uppercase mt-8 tracking-widest">Signé : Lassine Diakité, Karifa Keita, Modibo Keita</p>
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-mali-green/10 rounded-full blur-[80px]"></div>
      </div>
    </div>
  );
};

export default PoliticalProgram;
