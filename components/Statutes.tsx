
import React from 'react';
import { PARTY_NAME, PARTY_HQ, PARTY_MOTTO } from '../constants';
import { translations, Language } from '../translations';
// Added Calendar and Info to imports
import { FileText, Shield, MapPin, Users, Scale, Calendar, Info } from 'lucide-react';

const Statutes: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  const sections = [
    { title: "Dénomination & Siège", icon: <Shield />, text: t.articles.a1 + " " + t.articles.a2 },
    { title: "Devise & Emblème", icon: <FileText />, text: t.articles.a3 + " " + t.articles.a4 },
    { title: "Ressources Financières", icon: <Scale />, text: t.articles.a5 },
  ];

  return (
    <div className={`max-w-4xl mx-auto py-12 px-6 ${isAr ? 'text-end' : 'text-start'}`}>
      <div className="bg-white shadow-2xl rounded-[3rem] border border-gray-100 overflow-hidden mb-12">
        <div className="bg-mali-green p-12 text-white text-center">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            {t.statutesTitle}
          </h1>
          <p className="text-mali-yellow font-black text-xl italic">{PARTY_MOTTO}</p>
          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-center gap-8 text-xs font-black uppercase tracking-widest">
            <span className="flex items-center justify-center gap-2"><Calendar size={14}/> 05 Avril 2025</span>
            <span className="flex items-center justify-center gap-2"><MapPin size={14}/> Bamako, Mali</span>
          </div>
        </div>

        <div className="p-12 space-y-12 text-gray-700 leading-relaxed">
           <section className="space-y-4">
             <h2 className={`text-xl font-black flex items-center gap-3 text-mali-green uppercase ${isAr ? 'flex-row-reverse' : ''}`}>
               <Info /> Préambule
             </h2>
             <p className="font-medium bg-gray-50 p-8 rounded-3xl border-l-4 border-mali-yellow italic">
               {lang === 'fr' 
                 ? "Conscients des défis actuels auxquels fait face notre nation, nous, membres fondateurs du parti A.R.M, nous engageons à défendre l'intégrité territoriale du Mali et du Sahel et à œuvrer pour le bien-être de tous les maliens."
                 : "Conscious of the current challenges facing our nation, we, founding members of the A.R.M party, commit to defending the territorial integrity of Mali and the Sahel."
               }
             </p>
           </section>

           <div className="grid grid-cols-1 gap-6">
             {sections.map((s, i) => (
               <div key={i} className={`flex items-start gap-6 p-8 rounded-3xl border-2 border-gray-50 hover:border-mali-green/20 transition-all ${isAr ? 'flex-row-reverse' : ''}`}>
                 <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-mali-green flex-shrink-0">
                    {s.icon}
                 </div>
                 <div>
                   <h4 className="font-black uppercase text-sm mb-2 text-gray-900">{s.title}</h4>
                   <p className="text-sm font-medium text-gray-600">{s.text}</p>
                 </div>
               </div>
             ))}
           </div>

           <section className="space-y-6 pt-6 border-t border-gray-100">
             <h2 className={`text-xl font-black flex items-center gap-3 text-mali-green uppercase ${isAr ? 'flex-row-reverse' : ''}`}>
               <Users /> Organes du Parti (Art. 8)
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 rounded-2xl font-bold text-xs uppercase tracking-tight">1. Assemblée Générale (Suprême)</div>
                <div className="p-6 bg-gray-50 rounded-2xl font-bold text-xs uppercase tracking-tight">2. Bureau Exécutif National (BEN)</div>
                <div className="p-6 bg-gray-50 rounded-2xl font-bold text-xs uppercase tracking-tight">3. Comités Régionaux & Communaux</div>
             </div>
           </section>
        </div>

        <div className="bg-gray-50 p-12 border-t border-gray-100">
          <p className="font-black text-xs text-gray-400 uppercase tracking-[0.3em] mb-8 text-center">Signataires du Procès-Verbal</p>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isAr ? 'flex-row-reverse' : ''}`}>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100">
              <p className="font-black text-mali-green uppercase text-sm">Lassine Diakité</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Président</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100">
              <p className="font-black text-mali-green uppercase text-sm">Karifa Keita</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Secrétaire Général</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-100">
              <p className="font-black text-mali-green uppercase text-sm">Modibo Keita</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Secrétaire Administratif</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statutes;
