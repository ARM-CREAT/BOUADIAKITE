
import React from 'react';
import { Play, Video, Users, Mic, Monitor } from 'lucide-react';
import { translations, Language } from '../translations';

const MediaCenter: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  return (
    <div className={`max-w-6xl mx-auto py-12 px-6 ${isAr ? 'text-end' : ''}`}>
      <div className={`flex flex-col md:flex-row justify-between items-end mb-12 gap-6 ${isAr ? 'md:flex-row-reverse' : ''}`}>
        <div className={isAr ? 'text-end' : ''}>
          <h1 className="text-4xl font-black uppercase tracking-tighter">{t.media}</h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">{t.videoConf}</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-xs flex items-center gap-3 animate-pulse uppercase tracking-widest shadow-xl shadow-red-500/20">
             <div className="w-2 h-2 bg-white rounded-full"></div> {t.live}
           </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 ${isAr ? 'direction-rtl' : ''}`}>
        <div className="lg:col-span-2 space-y-10">
          <div className="relative aspect-video bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer border-4 border-white">
            <img src="https://picsum.photos/seed/mali_meeting/1280/720" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Video cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-mali-yellow rounded-full flex items-center justify-center text-mali-green shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={48} fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {[1, 2, 3, 4].map(v => (
               <div key={v} className="bg-white rounded-[2rem] shadow-xl border border-gray-50 overflow-hidden hover:-translate-y-2 transition-all">
                 <div className="h-44 bg-gray-200 relative">
                   <img src={`https://picsum.photos/seed/arm_${v}/600/300`} className="w-full h-full object-cover" alt="Thumb" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                     <Play className="text-white" size={32} />
                   </div>
                 </div>
                 <div className="p-6">
                   <h4 className="font-black text-gray-800 line-clamp-1 uppercase tracking-tight">Meeting Territorial #{v}</h4>
                   <p className="text-[10px] font-black text-gray-400 mt-2 uppercase tracking-widest">Archive ARM 2024</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-mali-green p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className={`text-2xl font-black mb-6 flex items-center gap-3 tracking-tighter ${isAr ? 'flex-row-reverse' : ''}`}><Video size={28}/> {t.videoConf}</h3>
              <p className="text-sm text-green-50 font-medium mb-10 leading-relaxed">{lang === 'fr' ? 'Rejoignez nos réunions virtuelles interactives.' : 'Join our interactive virtual meetings.'}</p>
              <div className="space-y-4">
                <button className={`w-full bg-white text-mali-green py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-mali-yellow transition-all uppercase tracking-widest shadow-xl ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Users size={20} /> {t.enterRoom}
                </button>
                <div className={`grid grid-cols-3 gap-3 text-center text-[9px] font-black uppercase tracking-widest text-green-200 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 border-2 border-green-400 rounded-2xl flex flex-col items-center gap-2"><Mic size={16} /> Mic</div>
                  <div className="p-3 border-2 border-green-400 rounded-2xl flex flex-col items-center gap-2"><Video size={16} /> Cam</div>
                  <div className="p-3 border-2 border-green-400 rounded-2xl flex flex-col items-center gap-2"><Monitor size={16} /> Screen</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCenter;
