
import React, { useState } from 'react';
// Added CheckCircle to imports
import { Users, Settings, Plus, Trash2, Sparkles, Layout, Calendar, Bell, Edit3, X, Save, Check, FileText, CheckCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Member, EventItem, NewsItem } from '../types';
import { translations, Language } from '../translations';
import { PARTY_MOTTO } from '../constants';

interface AdminDashboardProps {
  lang: Language;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  news: NewsItem[];
  setNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  bulletin: string;
  setBulletin: React.Dispatch<React.SetStateAction<string>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  members, setMembers,
  events, setEvents,
  news, setNews,
  bulletin, setBulletin
}) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState<'cms' | 'ai_studio'>('cms');
  
  // AI State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogin = () => {
    if (pass === 'ARM2024') setIsAuthenticated(true);
    else alert(lang === 'fr' ? 'Code incorrect' : 'Incorrect code');
  };

  const addItem = (type: 'member' | 'event' | 'news') => {
    if (type === 'member') {
      const newM = { name: "Nouveau Membre", role: "Rôle", location: "Ville" };
      setMembers([...members, newM]);
    } else if (type === 'event') {
      const newE = { id: Date.now().toString(), title: "Nouvel Événement", date: "2024-01-01", description: "...", location: "..." };
      setEvents([...events, newE]);
    }
  };

  const generateAI = async (mode: 'campaign' | 'social') => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: aiPrompt,
        config: {
          systemInstruction: `Tu es le stratège de communication de l'ARM Mali (Mali Kura). Devise: ${PARTY_MOTTO}. 
          Rédige un contenu ${mode === 'social' ? 'court pour réseaux sociaux' : 'officiel et formel'}. 
          Mets en avant les 8 objectifs fondamentaux du parti (Unité, Intégrité, Éducation, Santé, Souveraineté alimentaire). 
          Langue : ${lang}.`,
        },
      });
      setAiResult(response.text || '');
    } catch (e) {
      setAiResult("Erreur de génération. Vérifiez votre connexion.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={`max-w-md mx-auto mt-20 p-8 bg-white shadow-2xl rounded-[2.5rem] border border-gray-100 ${isAr ? 'text-right' : 'text-left'}`}>
        <div className="w-20 h-20 bg-mali-green rounded-3xl mx-auto mb-8 flex items-center justify-center text-white shadow-lg"><Settings size={40} /></div>
        <h2 className="text-2xl font-black mb-8 text-center uppercase tracking-tighter">Console Admin ARM</h2>
        <input 
          type="password" placeholder={t.authCode} 
          className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl mb-6 text-center text-xl focus:border-mali-green outline-none"
          value={pass} onChange={(e) => setPass(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin} className="w-full bg-mali-green text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all">{t.access}</button>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-10 mb-20 ${isAr ? 'text-right' : 'text-left'}`}>
      <header className={`flex flex-col md:flex-row justify-between gap-6 ${isAr ? 'md:flex-row-reverse' : ''}`}>
        <div className={isAr ? 'text-right' : 'text-left'}>
          <h1 className="text-4xl font-black uppercase tracking-tighter">{t.admin}</h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">{isAr ? 'نظام الإدارة المركزي - مالي كورا' : 'Gestion Centrale - Mali Kura'}</p>
        </div>
        <div className={`flex bg-gray-100 p-1.5 rounded-2xl ${isAr ? 'flex-row-reverse' : ''}`}>
          <button onClick={() => setActiveTab('cms')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'cms' ? 'bg-white text-mali-green shadow-sm' : 'text-gray-500'}`}><Layout size={16}/> {t.cms}</button>
          <button onClick={() => setActiveTab('ai_studio')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'ai_studio' ? 'bg-white text-mali-green shadow-sm' : 'text-gray-500'}`}><Sparkles size={16}/> {t.aiStudio}</button>
        </div>
      </header>

      {activeTab === 'cms' ? (
        <div className="space-y-10">
          {/* DAILY BULLETIN EDITOR */}
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border-4 border-mali-green relative overflow-hidden">
            <h3 className={`text-xl font-black mb-6 uppercase flex items-center gap-3 text-mali-green ${isAr ? 'flex-row-reverse' : ''}`}>
              <Bell /> {t.updateBulletin}
            </h3>
            <textarea 
              value={bulletin}
              onChange={(e) => setBulletin(e.target.value)}
              placeholder={t.bulletinPlaceholder}
              className={`w-full bg-gray-50 border-2 border-gray-100 rounded-[2rem] p-8 text-xl font-bold focus:border-mali-green outline-none min-h-[180px] shadow-inner ${isAr ? 'text-right' : 'text-left'}`}
            />
            <div className={`flex items-center gap-4 mt-6 ${isAr ? 'flex-row-reverse' : ''}`}>
               <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><CheckCircle size={14} className="text-mali-green"/> Mise à jour instantanée</span>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-mali-green/5 rounded-bl-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className={`flex justify-between items-center mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                <h3 className={`text-lg font-black uppercase flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}><Users className="text-mali-green" /> {t.leadership}</h3>
                <button onClick={() => addItem('member')} className="bg-mali-green text-white p-2 rounded-xl"><Plus size={16}/></button>
              </div>
              <div className="space-y-4">
                {members.map((m, i) => (
                  <div key={i} className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center group">
                    <div>
                      <input className="bg-transparent font-black text-xs uppercase outline-none focus:text-mali-green" value={m.name} onChange={(e) => {
                        const next = [...members];
                        next[i].name = e.target.value;
                        setMembers(next);
                      }} />
                      <input className="block bg-transparent text-[10px] text-mali-green font-black outline-none" value={m.role} onChange={(e) => {
                        const next = [...members];
                        next[i].role = e.target.value;
                        setMembers(next);
                      }} />
                    </div>
                    <button onClick={() => setMembers(members.filter((_, idx) => idx !== i))} className="p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className={`flex justify-between items-center mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                <h3 className={`text-lg font-black uppercase flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}><Calendar className="text-mali-green" /> {t.events}</h3>
                <button onClick={() => addItem('event')} className="bg-mali-green text-white p-2 rounded-xl"><Plus size={16}/></button>
              </div>
              <div className="space-y-4">
                {events.map(e => (
                  <div key={e.id} className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center group">
                    <div className="flex-1">
                      <input className="bg-transparent font-black text-xs uppercase outline-none w-full" value={e.title} onChange={(v) => {
                        setEvents(events.map(item => item.id === e.id ? {...item, title: v.target.value} : item));
                      }} />
                      <input className="bg-transparent text-[10px] text-gray-400 font-bold outline-none" value={e.date} onChange={(v) => {
                        setEvents(events.map(item => item.id === e.id ? {...item, date: v.target.value} : item));
                      }} />
                    </div>
                    <button onClick={() => setEvents(events.filter(item => item.id !== e.id))} className="p-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 ${isAr ? 'direction-rtl' : ''}`}>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-mali-green/10">
            <h3 className={`text-xl font-black mb-6 uppercase flex items-center gap-3 text-mali-green ${isAr ? 'flex-row-reverse' : ''}`}><Sparkles/> {t.aiStudio}</h3>
            <textarea 
              value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}
              placeholder={t.placeholder}
              className={`w-full bg-gray-50 border-2 border-gray-100 rounded-[2rem] p-6 text-sm focus:border-mali-green outline-none min-h-[200px] mb-8 ${isAr ? 'text-right' : 'text-left'}`}
            />
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => generateAI('social')} disabled={isGenerating} className="bg-mali-yellow text-mali-green py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-400 transition-all disabled:opacity-50">{isAr ? 'منشور اجتماعي' : 'Post Réseaux'}</button>
              <button onClick={() => generateAI('campaign')} disabled={isGenerating} className="bg-mali-green text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-all disabled:opacity-50">{isAr ? 'بيان رسمي' : 'Communiqué'}</button>
            </div>
          </div>
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-xl min-h-[400px] flex flex-col">
            <div className={`flex-1 overflow-y-auto whitespace-pre-wrap font-medium text-gray-700 leading-relaxed text-sm bg-gray-50 p-8 rounded-2xl border border-gray-100 ${isAr ? 'text-right' : 'text-left'}`}>
              {aiResult || (lang === 'fr' ? "Studio ARM Prêt. Posez une question sur le programme ou demandez une rédaction." : "ARM Studio Ready.")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
