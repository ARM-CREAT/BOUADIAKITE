
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { PARTY_HQ, PARTY_EMAILS } from '../constants';
import { translations, Language } from '../translations';

const Contact: React.FC<{ lang: Language }> = ({ lang }) => {
  const [sent, setSent] = useState(false);
  const t = translations[lang];
  const isAr = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className={`max-w-6xl mx-auto py-12 px-6 ${isAr ? 'text-end' : ''}`}>
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black uppercase text-gray-900 tracking-tighter">{t.contact}</h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto font-bold text-xs uppercase tracking-widest">{t.motto}</p>
        <div className="w-24 h-2 bg-mali-yellow mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-mali-green">
            <h3 className={`text-xl font-black mb-8 flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}><MessageSquare className="text-mali-green"/> {t.contact}</h3>
            <div className="space-y-8">
              <div className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-mali-green shadow-sm"><MapPin size={24}/></div>
                <div className={isAr ? 'text-end' : ''}>
                  <p className="font-black text-[10px] text-gray-400 uppercase tracking-widest">{t.hq}</p>
                  <p className="text-sm font-bold mt-1">{PARTY_HQ}</p>
                </div>
              </div>
              <div className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-mali-green shadow-sm"><Mail size={24}/></div>
                <div className={isAr ? 'text-end' : ''}>
                  <p className="font-black text-[10px] text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-bold mt-1 break-all">{PARTY_EMAILS[0]}</p>
                </div>
              </div>
              <div className={`flex items-start gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-mali-green shadow-sm"><Phone size={24}/></div>
                <div className={isAr ? 'text-end' : ''}>
                  <p className="font-black text-[10px] text-gray-400 uppercase tracking-widest">{t.phone}</p>
                  <p className="text-sm font-bold mt-1">+223 76 30 48 69</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-mali-green text-white p-12 rounded-[3rem] shadow-2xl text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Send size={48} />
              </div>
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Message Envoyé !</h3>
              <p className="text-green-50 font-medium">Nous vous répondrons dans les plus brefs délais.</p>
              <button onClick={() => setSent(false)} className="mt-10 bg-mali-yellow text-mali-green px-12 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl">Fermer</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-xl space-y-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.fullName}</label>
                  <input required type="text" className={`w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-mali-green outline-none font-medium ${isAr ? 'text-end' : ''}`} />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
                  <input required type="email" className={`w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-mali-green outline-none font-medium ${isAr ? 'text-end' : ''}`} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.subject}</label>
                <input required type="text" className={`w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-mali-green outline-none font-medium ${isAr ? 'text-end' : ''}`} />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.message}</label>
                <textarea required rows={5} className={`w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:border-mali-green outline-none font-medium ${isAr ? 'text-end' : ''}`}></textarea>
              </div>
              <button type="submit" className="w-full bg-mali-green text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 shadow-xl flex items-center justify-center gap-4 transition-all">
                {t.send} <Send size={24} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
