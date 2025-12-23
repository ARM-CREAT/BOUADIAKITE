
import React, { useState } from 'react';
import { MALI_REGIONS } from '../constants';
import { translations, Language } from '../translations';
import { CheckCircle } from 'lucide-react';

const JoinForm: React.FC<{ lang: Language }> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const t = translations[lang];
  const isAr = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-2xl text-center border border-gray-100 my-12 section-enter">
        <div className="w-20 h-20 bg-green-50 text-mali-green rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">{isAr ? 'تم استلام الطلب' : 'Demande reçue !'}</h2>
        <p className="text-gray-500 font-medium mb-8 leading-relaxed">{t.successJoin}</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-mali-green text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl"
        >
          {isAr ? 'إغلاق' : 'Fermer'}
        </button>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 my-12 ${isAr ? 'text-end' : 'text-start'} section-enter`}>
      <h2 className="text-3xl font-black mb-10 text-center text-mali-green uppercase tracking-tighter">{t.join}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.fullName}</label>
          <input required type="text" className={`w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-mali-yellow outline-none font-medium ${isAr ? 'text-end' : ''}`} placeholder="..." />
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.phone}</label>
          <input required type="tel" className={`w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-mali-yellow outline-none font-medium ${isAr ? 'text-end' : ''}`} placeholder="+223 ..." />
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.region}</label>
          <select required className={`w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-mali-yellow outline-none font-black text-xs uppercase ${isAr ? 'text-end' : ''}`}>
            {MALI_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            <option value="diaspora">Diaspora</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.locality}</label>
          <input required type="text" className={`w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-mali-yellow outline-none font-medium ${isAr ? 'text-end' : ''}`} />
        </div>
        <div className="md:col-span-2 space-y-1">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.profession}</label>
          <input type="text" className={`w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl focus:border-mali-yellow outline-none font-medium ${isAr ? 'text-end' : ''}`} />
        </div>
        <div className="md:col-span-2 py-4">
          <label className={`flex items-center gap-4 text-xs font-bold text-gray-500 cursor-pointer ${isAr ? 'flex-row-reverse' : ''}`}>
            <input required type="checkbox" className="w-5 h-5 rounded-lg border-2 text-mali-green focus:ring-mali-green" />
            <span>{isAr ? 'أوافق على اللوائح والنظام الأساسي للحزب' : 'Je déclare accepter les statuts et le règlement intérieur du parti A.R.M.'}</span>
          </label>
        </div>
        <button type="submit" className="md:col-span-2 bg-mali-yellow text-mali-green font-black py-5 rounded-2xl hover:bg-yellow-400 transition-all shadow-xl uppercase tracking-widest mt-4">
          {t.confirmJoin}
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
