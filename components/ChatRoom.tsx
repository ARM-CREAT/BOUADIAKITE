
import React, { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { Message } from '../types';
import { translations, Language } from '../translations';

const ChatRoom: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'Lassine D.', text: 'Bienvenue sur l\'espace de discussion de l\'A.R.M !', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'Militant ARM',
      text: input,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className={`max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[600px] ${isAr ? 'text-end' : ''}`}>
      <div className={`bg-mali-green text-white p-6 flex justify-between items-center ${isAr ? 'flex-row-reverse' : ''}`}>
        <h3 className={`font-black uppercase flex items-center gap-3 tracking-tighter ${isAr ? 'flex-row-reverse' : ''}`}><User size={24}/> Chat Public</h3>
        <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">{t.live}</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.user === 'Militant ARM' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] font-black text-gray-300 mb-2 uppercase tracking-widest px-2">{m.user}</span>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium shadow-sm ${
              m.user === 'Militant ARM' 
              ? 'bg-mali-green text-white rounded-tr-none' 
              : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t bg-white flex gap-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.placeholder}
          className={`flex-1 bg-gray-50 border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-mali-yellow font-medium ${isAr ? 'text-end' : ''}`}
        />
        <button 
          onClick={handleSend}
          className="bg-mali-yellow text-mali-green p-4 rounded-2xl hover:bg-yellow-400 shadow-xl transition-all"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
