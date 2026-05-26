import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Check, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Ассалому алейкум! Ман ёвари автоматии интеллектуалӣ ва маркази дастгирии мизоҷони DC ҳастам. Кадом савол Шуморо нигарон мекунад?',
      time: '12:00',
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const presetQuestions = [
    { q: 'Балансамро чӣ тавр заправка кунам?', a: 'Шумо метавонед тавозуни ҳамёни DC-и худро тавассути терминалҳои худхизматрасони Express Pay, кортҳои миллии ҳамаи бонкҳои Тоҷикистон ва ё суратҳисобҳои шарикӣ бе фоиз пур кунед.' },
    { q: 'Интиқол ба Русия чӣ хел мешавад?', a: 'Барои интиқол ба Русия ба бахши "Переводы" ворид шавед, "Интиқол ба хориҷа / Сбербанк" ё дигар бонкро интихоб кунед ва рақами корт ё телефонро ворид кунед. Комиссия созмон дода намешавад!' },
    { q: 'Телефонҳои маркази дастгирӣ', a: 'Телефони маркази дастгирии шабонарӯзӣ: +992 44 600 0111. Шумо инчунин метавонед ба почтаи info@dc.tj нависед.' }
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const getTime = () => {
      const d = new Date();
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    };

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    // Dynamic responses matching Tajik and Russian mobile wallet contexts
    setTimeout(() => {
      setIsTyping(false);
      let reply = 'Ташаккур барои муроҷиататон! Мутахассиси мо дар давоми 1-2 дақиқа бо Шумо тамос мегирад. Агар саволатон таъҷилӣ бошад, ба рақами кутоҳи 0111 занг занед.';
      
      const textLower = textToSend.toLowerCase();
      if (textLower.includes('баланс') || textLower.includes('пур кардан')) {
        reply = 'Барои пур кардани тавозуни DC Wallet терминалҳои Express Pay ё кортҳои миллиро истифода баред. Ин бе комиссия аст!';
      } else if (textLower.includes('корт') || textLower.includes('карта')) {
        reply = 'Танзимоти корт, ях кунонӣ ва лимитҳои харидро Шумо метавонед мустақиман дар бахши "Карты" дар саҳифаи асосӣ иҷро кунед.';
      } else if (textLower.includes('кирилл') || textLower.includes('салом') || textLower.includes('hello')) {
        reply = 'Салом! Ман дар ин ҷо ҳастам, то ба саволҳои молиявӣ ва амалиётҳои шумо дар дохили ҳамёни электронии Душанбе Сити ҷавоб диҳам.';
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: getTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 h-[560px] flex flex-col justify-between">
        
        {/* Header toolbar */}
        <div className="p-4 bg-[#1861D5] text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-full">
              <Bot className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-sm block">Дастгирии мизоҷон</span>
              <span className="text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                Оператор онлайн аст
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Preset list */}
        <div className="bg-slate-50 p-3 flex gap-2 overflow-x-auto scrollbar-none border-b border-slate-100 shrink-0 select-none">
          {presetQuestions.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pq.q)}
              className="flex-none py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200/60 rounded-full text-[11px] font-bold text-slate-700 transition-all cursor-pointer active:scale-95"
            >
              {pq.q}
            </button>
          ))}
        </div>

        {/* Message chat logs container */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex items-start gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`p-1.5 rounded-full shrink-0 ${msg.sender === 'user' ? 'bg-[#1861D5] text-white' : 'bg-slate-200 text-slate-700'}`}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="space-y-0.5">
                <div className={`p-3 rounded-2xl text-[12px] leading-relaxed font-semibold ${
                  msg.sender === 'user' 
                    ? 'bg-[#1861D5] text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-xs'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 font-mono block px-1 text-right">{msg.time}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-2.5 max-w-[80%]">
              <div className="p-1.5 bg-slate-200 text-slate-700 rounded-full shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-white text-slate-400 py-2 px-3 rounded-2xl rounded-tl-none text-[11px] font-semibold border border-slate-100 shadow-xs flex items-center gap-1 select-none">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-0" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 shrink-0">
          <input 
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(chatInput)}
            placeholder="Саволи худро нависед..."
            className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:bg-white focus:border-blue-400 transition-all font-sans"
          />
          <button 
            onClick={() => handleSend(chatInput)}
            className="p-2.5 bg-[#1861D5] hover:opacity-90 active:scale-90 text-white rounded-2xl transition-all cursor-pointer"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
