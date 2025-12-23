
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Statutes from './components/Statutes';
import JoinForm from './components/JoinForm';
import Donation from './components/Donation';
import ChatRoom from './components/ChatRoom';
import AdminDashboard from './components/AdminDashboard';
import PoliticalProgram from './components/PoliticalProgram';
import MediaCenter from './components/MediaCenter';
import Contact from './components/Contact';
import SocialConcerns from './components/SocialConcerns';
import AIAssistant from './components/AIAssistant';
import { AppSection, Member, EventItem, NewsItem } from './types';
import { translations, Language } from './translations';
import { 
  PARTY_NAME, 
  PARTY_MOTTO, 
  LEADERSHIP as INITIAL_LEADERSHIP, 
  INITIAL_EVENTS, 
  INITIAL_NEWS,
  PARTY_HQ,
  MALI_REGIONS,
  OFFICIAL_OBJECTIVES
} from './constants';
import { MapPin, Smartphone, Bot, Bell, Share2, Info, CheckCircle, MessageSquareQuote } from 'lucide-react';

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.HOME);
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('arm_lang') as Language) || 'fr');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const [bulletin, setBulletin] = useState<string>(() => {
    return localStorage.getItem('arm_bulletin') || "Bienvenue sur la plateforme officielle de l'ARM. Ensemble pour un Mali fort et souverain. Consultez nos objectifs officiels dans l'onglet Programme.";
  });

  const t = translations[lang];

  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('arm_members');
    return saved ? JSON.parse(saved) : INITIAL_LEADERSHIP;
  });
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('arm_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });
  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('arm_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const objectives = useMemo(() => OFFICIAL_OBJECTIVES.map(obj => ({
    ...obj,
    title: (t as any)[obj.key] || obj.key,
    desc: ""
  })), [t]);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    const params = new URLSearchParams(window.location.search);
    const sectionParam = params.get('section');
    if (sectionParam === 'join') setSection(AppSection.JOIN);
    if (sectionParam === 'news') setSection(AppSection.NEWS);
    if (sectionParam === 'concerns') setSection(AppSection.SOCIAL_CONCERNS);
  }, []);

  useEffect(() => {
    localStorage.setItem('arm_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => localStorage.setItem('arm_bulletin', bulletin), [bulletin]);
  useEffect(() => localStorage.setItem('arm_members', JSON.stringify(members)), [members]);
  useEffect(() => localStorage.setItem('arm_events', JSON.stringify(events)), [events]);
  useEffect(() => localStorage.setItem('arm_news', JSON.stringify(news)), [news]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('L\'utilisateur a installé l\'application ARM');
        }
        setDeferredPrompt(null);
      });
    } else {
      setSection(AppSection.JOIN);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: PARTY_NAME,
        text: `Bulletin ARM : ${bulletin}`,
        url: window.location.href,
      });
    }
  };

  const renderContent = () => {
    switch (section) {
      case AppSection.STATUTES: return <Statutes lang={lang} />;
      case AppSection.PROGRAM: return <PoliticalProgram pillars={objectives} lang={lang} />;
      case AppSection.MEDIA: return <MediaCenter lang={lang} />;
      case AppSection.CONTACT: return <Contact lang={lang} />;
      case AppSection.SOCIAL_CONCERNS: return <SocialConcerns lang={lang} />;
      case AppSection.JOIN: return <JoinForm lang={lang} />;
      case AppSection.DONATE: return <Donation lang={lang} />;
      case AppSection.CHAT: return <ChatRoom lang={lang} />;
      case AppSection.ADMIN: 
        return (
          <AdminDashboard 
            lang={lang}
            members={members} setMembers={setMembers}
            events={events} setEvents={setEvents}
            news={news} setNews={setNews}
            bulletin={bulletin} setBulletin={setBulletin}
          />
        );
      case AppSection.EVENTS:
        return (
          <div className="max-w-6xl mx-auto px-4 py-12 section-enter">
            <h1 className="text-4xl font-black mb-12 text-center uppercase tracking-tighter">{t.events}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border hover:-translate-y-2 transition-all">
                  <div className="h-56 bg-gray-200">
                    <img src={event.image || `https://picsum.photos/seed/${event.id}/800/400`} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className={`p-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <span className="bg-mali-yellow text-mali-green font-black text-[10px] uppercase px-3 py-1 rounded-full mb-4 inline-block">{event.date} • {event.location}</span>
                    <h3 className="text-2xl font-black mt-2 uppercase">{event.title}</h3>
                    <p className="text-gray-600 mt-4 leading-relaxed line-clamp-3">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case AppSection.NEWS:
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 section-enter">
            <h1 className="text-4xl font-black mb-12 text-center uppercase text-mali-green tracking-tighter">{t.news}</h1>
            <div className="space-y-8">
              {news.map(n => (
                <article key={n.id} className={`bg-white p-8 rounded-3xl shadow-md border-s-8 border-mali-yellow hover:shadow-xl transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <span className="text-xs font-black text-gray-400 uppercase">{n.date}</span>
                  <h3 className="text-2xl font-black my-4 uppercase tracking-tighter text-gray-800">{n.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed italic">"{n.summary}"</p>
                </article>
              ))}
            </div>
          </div>
        );
      case AppSection.HOME:
      default:
        return (
          <div className="space-y-12 section-enter pb-24">
            <div className="relative h-[85vh] flex items-center justify-center text-center px-4 bg-mali-green overflow-hidden">
               <div className="absolute inset-0 opacity-40">
                  <img src="https://images.unsplash.com/photo-1544207557-ca89ac1f279e?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Mali" />
                  <div className="absolute inset-0 bg-gradient-to-b from-mali-green/80 via-mali-green/40 to-mali-green/90"></div>
               </div>
               <div className="relative z-10 max-w-5xl">
                  <div className="w-32 h-32 bg-white rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center shadow-2xl border-4 border-mali-yellow animate-bounce-slow overflow-hidden">
                    <img src="https://picsum.photos/seed/arm_emblem/200" alt="ARM Emblem" className="w-full h-full object-cover scale-125" />
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter">{lang === 'fr' ? PARTY_NAME : t.heroTitle}</h1>
                  <p className="text-xl md:text-3xl text-mali-yellow font-black mb-12 italic uppercase tracking-widest">{t.motto}</p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button onClick={() => setSection(AppSection.SOCIAL_CONCERNS)} className="bg-mali-yellow text-mali-green px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase tracking-widest">{t.socialConcerns}</button>
                    <button onClick={() => setSection(AppSection.JOIN)} className="bg-white text-mali-green px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl uppercase tracking-widest">{t.join}</button>
                  </div>
               </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-20">
              <div className="bg-white border-4 border-mali-green rounded-[3rem] p-1 shadow-2xl overflow-hidden group">
                <div className="bg-mali-green px-8 py-5 flex items-center justify-between text-white">
                   <h3 className={`font-black uppercase flex items-center gap-3 tracking-tighter text-sm ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                     <Bell size={22} className="animate-pulse" /> {t.dailyBulletin}
                   </h3>
                   <div className="flex gap-4">
                     <button onClick={handleShare} className="hover:scale-110 transition-all bg-white/10 p-2 rounded-xl"><Share2 size={20} /></button>
                   </div>
                </div>
                <div className={`p-10 bg-gradient-to-br from-white to-gray-50 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-start gap-4 mb-4 text-mali-green ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <Info size={24} className="flex-shrink-0 mt-1" />
                    <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
                      {bulletin}
                    </p>
                  </div>
                  <div className={`flex items-center gap-2 mt-6 text-[10px] font-black uppercase text-gray-400 tracking-widest ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle size={14} className="text-mali-green" /> {lang === 'fr' ? 'Information certifiée ARM' : 'ARM Certified Info'}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10">
              <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">{t.visionTitle}</h2>
              <div className={`bg-gray-900 text-white p-16 rounded-[4rem] shadow-2xl text-center relative overflow-hidden mb-20 ${lang === 'ar' ? 'text-right' : ''}`}>
                <div className="relative z-10">
                  <p className="text-2xl md:text-4xl font-black italic text-mali-yellow leading-tight mb-8">"{t.visionDesc}"</p>
                  <div className="w-32 h-1 bg-mali-green mx-auto rounded-full mb-12"></div>
                  <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    {objectives.slice(0, 4).map((obj, i) => (
                      <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer" onClick={() => setSection(AppSection.PROGRAM)}>
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-mali-yellow group-hover:bg-mali-yellow group-hover:text-mali-green transition-all border border-white/10">
                          {React.cloneElement(obj.icon, { size: 28 })}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{obj.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-mali-green/10 rounded-full blur-[100px]"></div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-tighter">{t.leadership}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {members.slice(0, 3).map((m, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center hover:border-mali-green transition-all group">
                    <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-white shadow-md group-hover:border-mali-green transition-all">
                      <img src={`https://picsum.photos/seed/${m.name}/200`} className="w-full h-full object-cover" alt={m.name} />
                    </div>
                    <h3 className="font-black text-xl uppercase mb-1">{m.name}</h3>
                    <p className="text-mali-green text-xs font-black uppercase mb-4 tracking-wider">{m.role}</p>
                    <p className="text-gray-500 text-sm font-bold flex items-center justify-center gap-2"><MapPin size={14}/> {m.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 pb-16 lg:pb-0 ${lang === 'ar' ? 'font-arabic' : ''}`}>
      <Navbar 
        currentSection={section} 
        setSection={setSection} 
        onInstall={handleInstallClick} 
        lang={lang} 
        setLang={setLang} 
      />
      <main className="flex-grow">{renderContent()}</main>
      <div className={`fixed bottom-10 z-[70] flex flex-col gap-4 ${lang === 'ar' ? 'left-10' : 'right-10'}`}>
        <button onClick={() => setIsAiOpen(!isAiOpen)} className="bg-mali-green text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border-4 border-white hover:scale-110 transition-all active:scale-95">
          <Bot size={28} />
        </button>
      </div>
      <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} lang={lang} />
      <BottomNav currentSection={section} setSection={setSection} lang={lang} />
    </div>
  );
};

export default App;
