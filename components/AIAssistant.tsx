
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, X } from 'lucide-react';
import { PARTY_NAME, PARTY_MOTTO } from '../constants';
import { translations, Language } from '../translations';

const AIAssistant: React.FC<{ isOpen: boolean; onClose: () => void; lang: Language }> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcome = {
      fr: `Bonjour ! Je suis l'assistant de l'${PARTY_NAME}. Comment puis-je vous aider ?`,
      en: `Hello! I am the ${PARTY_NAME} assistant. How can I help you?`,
      es: `¡Hola! Soy el asistente de la ${PARTY_NAME}. ¿Cómo puedo ayudarle?`,
      ar: `مرحباً! أنا المساعد الذكي لـ ${PARTY_NAME}. كيف يمكنني مساعدتك؟`
    };
    setMessages([{ role: 'bot', text: welcome[lang] }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleChat = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userText,
        config: {
          systemInstruction: `Tu es l'assistant officiel de l'ARM (Alliance pour le Rassemblement Malien).
          Devise: "${PARTY_MOTTO}". Réponds en ${lang === 'fr' ? 'français' : lang === 'en' ? 'anglais' : lang === 'es' ? 'espagnol' : 'arabe'}. 
          Sois courtois et patriote.`,
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Vive le Mali !" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Service indisponible." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-24 w-96 max-w-[90vw] h-[500px] bg-white rounded-3xl shadow-2xl z-[60] border border-gray-100 flex flex-col overflow-hidden section-enter ${lang === 'ar' ? 'left-6' : 'right-6'}`}>
      <div className={`bg-mali-green p-4 text-white flex justify-between items-center ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 bg-mali-yellow rounded-2xl flex items-center justify-center text-mali-green"><Bot size={24} /></div>
          <div className={lang === 'ar' ? 'text-end' : 'text-start'}>
            <p className="font-black text-sm uppercase">{t.aiAssistant}</p>
            <p className="text-[10px] text-green-100 font-bold">Active</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl"><X size={20}/></button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
              m.role === 'user' ? 'bg-mali-green text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            } ${lang === 'ar' ? 'text-end' : 'text-start'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className={`relative flex gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <input 
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleChat()}
            placeholder={t.placeholder}
            className={`w-full bg-gray-100 border-none rounded-2xl py-4 px-4 text-sm focus:ring-2 focus:ring-mali-green outline-none ${lang === 'ar' ? 'text-end' : 'text-start'}`}
          />
          <button onClick={handleChat} className="bg-mali-yellow text-mali-green p-4 rounded-2xl hover:scale-105 transition-all shadow-md"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
