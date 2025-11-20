import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Bot, User, Wand2, Zap, Camera, X } from 'lucide-react';
import { UserTier, ChatMessage } from '../types';
import { geminiService } from '../services/geminiService';
import { Chat } from '@google/genai';

interface FinChatProps { tier: UserTier; }

const FinChat: React.FC<FinChatProps> = ({ tier }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'chat' | 'generate'>('chat');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initChat = async () => { try { const s = await geminiService.createChatSession(tier); setChatSession(s); } catch (e) { console.error(e); } };
    initChat();
  }, [tier]);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(() => { scrollToBottom(); }, [messages, isLoading, selectedImage]);
  useEffect(() => { const t = setTimeout(scrollToBottom, 100); return () => clearTimeout(t); });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { const r = new FileReader(); r.onloadend = () => { setSelectedImage(r.result as string); setMode('chat'); }; r.readAsDataURL(f); }
    if (e.target) e.target.value = '';
  };

  const handleSend = async (txt?: string) => {
    const text = txt || input;
    if ((!text.trim() && !selectedImage) || !chatSession || isLoading) return;
    setInput(''); setIsLoading(true);
    const imgToSend = selectedImage; setSelectedImage(null);
    setMessages(p => [...p, { id: Date.now().toString(), role: 'user', text, attachment: imgToSend || undefined, timestamp: new Date() }]);

    try {
       if (mode === 'generate' && !imgToSend) {
          const img = await geminiService.generateImage(text);
          setMessages(p => [...p, { id: Date.now().toString(), role: 'model', text: img ? 'Visualisasi berhasil dibuat:' : 'Gagal membuat gambar.', imageUrl: img || undefined, timestamp: new Date() }]);
          setMode('chat');
       } else if (imgToSend) {
          const res = await geminiService.sendImageMessage(chatSession, text, imgToSend);
          // CLEANUP MARKDOWN BOLD SYNTAX (**) 
          const cleanRes = res.replace(/\*\*/g, '');
          setMessages(p => [...p, { id: Date.now().toString(), role: 'model', text: cleanRes, timestamp: new Date() }]);
       } else {
          const res = await chatSession.sendMessage({ message: text });
          // CLEANUP MARKDOWN BOLD SYNTAX (**)
          const rawText = res.text || 'Maaf, terjadi kesalahan.';
          const cleanRes = rawText.replace(/\*\*/g, '');
          setMessages(p => [...p, { id: Date.now().toString(), role: 'model', text: cleanRes, timestamp: new Date() }]);
       }
    } catch (e) { setMessages(p => [...p, { id: Date.now().toString(), role: 'model', text: 'Maaf, terjadi gangguan koneksi.', timestamp: new Date() }]); } 
    finally { setIsLoading(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] bg-white/80 backdrop-blur-xl rounded-[32px] shadow-sm border border-white overflow-hidden relative animate-enter">
        <div className="p-5 border-b border-slate-50 bg-white/50 flex justify-between items-center">
           <div className="flex items-center gap-3"><div className="bg-[#FF8FAB] p-2 rounded-xl text-white shadow-sm"><Sparkles size={18} /></div><div><h3 className="font-bold text-slate-800 text-sm">FinChat AI</h3><p className="text-[10px] text-slate-400">Powered by Gemini 2.5</p></div></div>
           <span className="text-[10px] font-bold text-[#A7D7C5] bg-green-50 px-3 py-1 rounded-full border border-green-100 flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#A7D7C5] animate-pulse"></div> Online</span>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide relative">
           {messages.length === 0 && (
              <div className="text-center mt-10 px-8">
                 <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-pink-50 rounded-[24px] mx-auto flex items-center justify-center mb-6 border border-white shadow-sm"><Bot size={40} className="text-[#8ECAE6]" /></div>
                 <p className="text-lg font-extrabold text-slate-800 mb-2">Halo, saya Finly!</p>
                 <div className="flex flex-wrap justify-center gap-2">{["Analisis Arus Kas", "Tips Pajak", "Ide Investasi"].map((t, i) => (<button key={i} onClick={() => handleSend(t)} className="px-4 py-2 bg-white border border-slate-100 rounded-full text-xs font-bold text-slate-600 hover:bg-[#8ECAE6] hover:text-white transition-all shadow-sm gap-2 flex"><Zap size={12} className="text-[#FF8FAB]"/> {t}</button>))}</div>
              </div>
           )}
           {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-enter`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-[#8ECAE6] text-white'}`}>{msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}</div>
                  <div className={`max-w-[80%] p-4 rounded-[20px] text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${msg.role === 'user' ? 'bg-[#FF8FAB] text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                     {msg.attachment && (<div className="mb-3 rounded-xl overflow-hidden border border-white/30 shadow-sm"><img src={msg.attachment} className="w-full h-auto max-h-[200px] object-cover" /></div>)}
                     {msg.text}
                     {msg.imageUrl && (<div className="mt-3 rounded-2xl overflow-hidden border border-white/20 shadow-md"><img src={msg.imageUrl} className="w-full h-auto object-cover" /></div>)}
                  </div>
              </div>
           ))}
           {isLoading && (<div className="flex gap-3 animate-enter"><div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#8ECAE6] text-white"><Sparkles size={14} /></div><div className="bg-white p-4 rounded-[20px] rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1 h-10"><div className="w-2 h-2 bg-[#8ECAE6] rounded-full animate-bounce"></div><div className="w-2 h-2 bg-[#FF8FAB] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div><div className="w-2 h-2 bg-[#A7D7C5] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div></div></div>)}
           <div ref={messagesEndRef} />
        </div>
        {selectedImage && (<div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-3 animate-enter"><div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-white"><img src={selectedImage} className="w-full h-full object-cover" /><button onClick={() => setSelectedImage(null)} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white"><X size={16} /></button></div><div className="flex-1"><p className="text-xs font-bold text-slate-700">Gambar Terpilih</p></div></div>)}
        <div className="p-4 bg-white border-t border-slate-50 flex items-end gap-2">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
            <button onClick={() => { setMode(mode === 'generate' ? 'chat' : 'generate'); setSelectedImage(null); }} className={`p-3 rounded-2xl active:scale-95 border ${mode === 'generate' ? 'bg-purple-50 text-[#9333EA] border-purple-100' : 'bg-slate-50 text-slate-400 border-transparent'}`}><Wand2 size={20}/></button>
            <button onClick={() => fileInputRef.current?.click()} className={`p-3 rounded-2xl active:scale-95 border ${selectedImage ? 'bg-blue-50 text-[#8ECAE6] border-blue-100' : 'bg-slate-50 text-slate-400 border-transparent'}`}><Camera size={20}/></button>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }} className="flex-1 bg-slate-50 rounded-2xl p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#8ECAE6]/50 resize-none h-[50px] max-h-[100px] text-slate-700" placeholder={mode === 'generate' ? "Deskripsi gambar..." : selectedImage ? "Analisis gambar..." : "Ketik pesan..."} />
            <button onClick={() => handleSend()} disabled={(!input.trim() && !selectedImage) || isLoading} className="p-3 bg-[#FF8FAB] text-white rounded-2xl hover:bg-pink-400 disabled:opacity-50 shadow-lg shadow-pink-200 active:scale-95"><Send size={20} /></button>
        </div>
    </div>
  );
};

export default FinChat;