
import React, { useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { translations, Language } from '../translations';

const Donation: React.FC<{ lang: Language }> = ({ lang }) => {
  const [amount, setAmount] = useState<number | null>(10);
  const [step, setStep] = useState(1);
  const t = translations[lang];
  const isAr = lang === 'ar';

  const amounts = [5, 10, 20, 50];

  return (
    <div className={`max-w-md mx-auto bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 ${isAr ? 'text-end' : ''}`}>
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{t.support}</h2>
        <p className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-widest">BMS Mali Partner</p>
      </div>

      {step === 1 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {amounts.map(a => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`py-5 border-2 rounded-2xl font-black text-xl transition-all ${
                  amount === a ? 'border-mali-green bg-green-50 text-mali-green shadow-inner' : 'border-gray-50 hover:border-mali-yellow text-gray-400'
                }`}
              >
                {a} €
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder={t.amount + " (€)"}
            onChange={(e) => setAmount(Number(e.target.value))}
            className={`w-full bg-gray-50 border-b-4 border-gray-100 p-4 text-center text-2xl font-black focus:border-mali-green outline-none rounded-t-2xl ${isAr ? 'text-end' : ''}`}
          />
          <button 
            onClick={() => setStep(2)}
            disabled={!amount || amount <= 0}
            className="w-full bg-mali-green text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all disabled:opacity-50 shadow-xl"
          >
            {t.access}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`bg-gray-50 p-6 rounded-2xl flex justify-between items-center mb-6 border border-gray-100 ${isAr ? 'flex-row-reverse' : ''}`}>
            <span className="text-gray-400 font-black text-xs uppercase">{t.amount} :</span>
            <span className="font-black text-2xl text-mali-green">{amount} €</span>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <CreditCard className={`absolute top-4 text-gray-300 ${isAr ? 'right-4' : 'left-4'}`} size={20} />
              <input type="text" placeholder="Card Number" className={`w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-mali-green font-medium ${isAr ? 'pr-12 text-end' : 'pl-12'}`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM/YY" className="bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-mali-green text-center font-bold" />
              <input type="text" placeholder="CVC" className="bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none focus:border-mali-green text-center font-bold" />
            </div>
            <button 
              className="w-full bg-mali-yellow text-mali-green py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl mt-6"
              onClick={() => alert("Simulé - Merci !")}
            >
              {t.paymentSecure}
            </button>
            <button onClick={() => setStep(1)} className="w-full text-gray-400 text-[10px] font-black uppercase hover:underline">{lang === 'fr' ? 'Modifier' : 'Back'}</button>
          </div>
          <div className={`flex items-center justify-center gap-2 text-[10px] font-black text-gray-300 mt-8 uppercase ${isAr ? 'flex-row-reverse' : ''}`}>
            <ShieldCheck size={14} />
            SSL Encrypted (BMS Mali)
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;
