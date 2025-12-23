
import React, { useState } from 'react';
import { translations, Language } from '../translations';
import { MALI_REGIONS } from '../constants';
import { HeartPulse, GraduationCap, ShieldAlert, Tractor, Construction, UserPlus, Send, CheckCircle } from 'lucide-react';

const SocialConcerns: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'health', icon: <HeartPulse />, label: t.categories.health },
    { id: 'education', icon: <GraduationCap />, label: t.categories.education },
    { id: 'security', icon: <ShieldAlert />, label: t.categories.security },
    { id: 'agriculture', icon: <Tractor />, label: t.categories.agriculture },
    { id: 'infra', icon: <Construction />, label: t.categories.infra },
    { id: 'employment', icon: <UserPlus />, label: t.categories.employment },
  ];

  const [selectedCat, setSelectedCat] = useState('health');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-gray-100 my-12 section-enter">
        <div className="w-24 h-24 bg-green-50 text-mali-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter text-gray-900">{isAr ? 'تم استلام طلبكم' : 'Message Reçu'}</h2>
        <p className="text-gray-500 font-medium mb-10 leading-relaxed text-lg">{t.concernSuccess}</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="w-full bg-mali-green text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
        >
          {isAr ? 'إغلاق' : 'Continuer'}
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto py-12 px-6 ${isAr ? 'text-end' : ''} section-enter`}>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">{t.socialConcerns}</h1>
        <p className="text-mali-green font-black uppercase tracking-widest text-xs">Mali Kura : Votre voix compte</p>
        <div className="w-24 h-2 bg-mali-yellow mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden relative">
        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">{t.concernCategory}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group ${
                    selectedCat === cat.id 
                    ? 'border-mali-green bg-green-50 text-mali-green shadow-lg scale-105' 
                    : 'border-gray-50 hover:border-mali-yellow bg-gray-50/50 text-gray-400'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    selectedCat === cat.id ? 'bg-mali-green text-white shadow-md' : 'bg-white text-gray-300'
                  }`}>
                    {cat.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t.region}</label>
              <select className={`w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:border-mali-green outline-none font-black text-xs uppercase ${isAr ? 'text-end' : ''}`}>
                {MALI_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t.locality}</label>
              <input required type="text" className={`w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl focus:border-mali-green outline-none font-medium ${isAr ? 'text-end' : ''}`} placeholder="Commune, quartier..." />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t.message}</label>
            <textarea 
              required 
              rows={6} 
              className={`w-full bg-gray-50 border-2 border-transparent rounded-3xl p-6 text-lg font-medium focus:border-mali-green outline-none shadow-inner ${isAr ? 'text-end' : ''}`}
              placeholder={t.concernPlaceholder}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-mali-green text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-4"
          >
            {t.send} <Send size={24} />
          </button>
        </form>
        <div className="absolute top-0 right-0 w-64 h-64 bg-mali-yellow/5 rounded-full blur-[80px] -z-0"></div>
      </div>

      <div className="mt-16 bg-gray-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="w-20 h-20 bg-mali-yellow rounded-3xl flex items-center justify-center text-mali-green flex-shrink-0 shadow-lg">
             <CheckCircle size={40} />
           </div>
           <div className={isAr ? 'text-end' : 'text-left'}>
             <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Suivi Citoyen</h3>
             <p className="text-gray-400 font-medium leading-relaxed">Chaque remontée est anonymisée et transmise aux commissions techniques de l'ARM pour intégration dans nos futures propositions de lois et de projets de développement.</p>
           </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-mali-green/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default SocialConcerns;
