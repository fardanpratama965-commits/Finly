import React from 'react';
import { UserTier } from '../types';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  MessageCircle, ShoppingBag, Store, Instagram, Wind, Droplets, TrendingUp, 
  Sparkles, Zap, Landmark, Building2, CreditCard, Wallet, ExternalLink, 
  Smartphone, Gamepad2, Brain, Trophy, Gift, Star, ArrowRight, Tag, MapPin, Search
} from 'lucide-react';

interface DashboardProps {
  tier: UserTier;
  onNavigate: (tab: string) => void;
  userName?: string;
}

// --- PROMO BANNER COMPONENT ---
const PromoBanner = () => (
  <div className="mt-6 relative w-full h-44 rounded-[32px] overflow-hidden shadow-lg group cursor-pointer transition-transform hover:scale-[1.01]">
    {/* Background with Pattern */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#8ECAE6] to-[#A7D7C5]"></div>
    <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px'}}></div>
    
    {/* Decorative Abstract Shapes */}
    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
    <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>

    <div className="relative z-10 h-full flex items-center px-6 text-white">
       <div className="flex-1 pr-4">
          <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider mb-2 border border-white/30">
             <Tag size={10} /> Special Offer
          </div>
          <h3 className="text-xl font-extrabold leading-tight mb-1 text-shadow-sm">Upgrade Pro Hemat 50%</h3>
          <p className="text-[10px] font-medium opacity-90 mb-3 leading-relaxed">Analisis bisnis lengkap & prioritas AI support 24/7.</p>
          <button className="bg-white text-[#8ECAE6] px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-1 active:scale-95">
             Ambil Promo <ArrowRight size={12}/>
          </button>
       </div>
       {/* Visual Illustration */}
       <div className="relative w-24 h-24 flex-shrink-0">
           <Gift size={90} className="text-white opacity-20 absolute right-0 bottom-0 rotate-12" />
           <div className="absolute top-2 right-2 animate-bounce">
              <Star size={32} className="text-yellow-300 fill-yellow-300 drop-shadow-md" />
           </div>
       </div>
    </div>
  </div>
);

const TierProgressCard = ({ tier }: { tier: UserTier }) => {
  const getTierData = () => {
    if (tier === UserTier.FREE_TRIAL) return { label: "Trial", next: "Basic", progress: 14, points: 50 };
    if (tier === UserTier.BASIC) return { label: "Starter", next: "Pro", progress: 35, points: 1200 };
    if (tier === UserTier.PRO) return { label: "Pro Business", next: "Enterprise", progress: 68, points: 4500 };
    return { label: "Enterprise", next: "Global", progress: 92, points: 12500 };
  };
  const data = getTierData();

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex items-stretch relative overflow-hidden animate-enter group">
       {/* Texture Background */}
       <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
       <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#8ECAE6]/20 to-[#FF8FAB]/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
       
       <div className="pr-6 border-r border-slate-100 relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <div className={`p-1.5 rounded-xl ${tier === UserTier.BASIC ? 'bg-blue-50 text-[#8ECAE6]' : 'bg-pink-50 text-[#FF8FAB]'}`}><Wallet size={18} /></div>
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Finly Score</span>
          </div>
          <div className="flex items-baseline gap-1"><h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{data.points.toLocaleString()}</h2></div>
          <div className={`mt-3 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold shadow-sm ${tier === UserTier.BASIC ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>{data.label} Plan</div>
       </div>
       <div className="flex-1 pl-6 flex flex-col justify-center relative z-10">
          <div className="flex justify-between mb-3">
             <span className="text-xs font-bold text-slate-500">Next: {data.next}</span>
             <span className="text-xs font-bold text-[#FF8FAB]">{data.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
             <div className={`h-full rounded-full bg-gradient-to-r ${tier === UserTier.PRO ? 'from-[#FF8FAB] to-[#8ECAE6]' : 'from-[#8ECAE6] to-[#A7D7C5]'} transition-all duration-1000`} style={{width: `${data.progress}%`}}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 font-medium">Kumpulkan <span className="text-slate-800 font-bold">800 poin</span> lagi.</p>
       </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ tier, onNavigate }) => {
  const GREEN = "#A7D7C5";
  const openExternalLink = (url: string) => { window.open(url, '_blank', 'noopener,noreferrer'); };

  return (
    <div className="pb-24 animate-enter">
      {/* SEARCH BAR */}
      <div className="mb-6 relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8ECAE6] transition-colors">
            <Search size={20} />
        </div>
        <input 
            type="text" 
            placeholder="Cari fitur, layanan, atau bantuan..." 
            className="w-full pl-14 pr-4 py-4 bg-white rounded-[24px] border border-slate-50 shadow-sm text-sm font-bold text-slate-700 placeholder:font-medium placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-[#8ECAE6]/50 focus:border-transparent transition-all"
        />
      </div>

      <TierProgressCard tier={tier} />
      
      <PromoBanner />

      {/* WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
         {/* FinChat */}
         <div className="bg-gradient-to-br from-white to-slate-50 rounded-[32px] p-6 shadow-sm border border-white flex flex-col justify-between min-h-[200px] relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF8FAB] to-transparent opacity-10 rounded-bl-full transition-transform group-hover:scale-110"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#FFF0F3] p-2 rounded-2xl text-[#FF8FAB] shadow-sm"><Sparkles size={20} /></div>
                  <h4 className="font-bold text-slate-800 text-lg">FinChat AI</h4>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed font-medium">Ada transaksi aneh? Atau mau prediksi cashflow? AI siap bantu 24/7.</p>
            </div>
            <button onClick={() => onNavigate('finchat')} className="relative z-10 w-full py-3.5 bg-white rounded-2xl text-sm font-bold text-slate-600 hover:text-[#FF8FAB] hover:shadow-lg transition-all border border-slate-100 flex items-center justify-center gap-2 mt-4 active:scale-95">
               <MessageCircle size={16} className="text-[#FF8FAB]" /> Mulai Chat
            </button>
         </div>
         
         {/* Profit Chart */}
         <div className="bg-white rounded-[32px] p-6 shadow-sm border border-white min-h-[200px] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 relative z-10">
               <div className="flex items-center gap-3">
                  <div className="bg-[#F0FDF4] p-2 rounded-2xl text-[#A7D7C5] shadow-sm"><TrendingUp size={20} /></div>
                  <h4 className="font-bold text-slate-800 text-lg">Profit</h4>
               </div>
               <span className="text-sm font-bold text-[#A7D7C5] bg-[#F0FDF4] px-2 py-1 rounded-lg border border-green-100">+12.5%</span>
            </div>
            <div className="h-[100px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={[{v:10},{v:25},{v:18},{v:35},{v:45},{v:40},{v:65}]}>
                    <defs><linearGradient id="colorPastelGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={GREEN} stopOpacity={0.4}/><stop offset="95%" stopColor={GREEN} stopOpacity={0}/></linearGradient></defs>
                    <Area type="monotone" dataKey="v" stroke={GREEN} strokeWidth={4} fill="url(#colorPastelGreen)" />
                 </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* FINLY GAMES */}
      <div className="mt-6 bg-[#F3E8FF] rounded-[32px] p-6 relative overflow-hidden border border-[#D8B4FE] shadow-sm group hover:shadow-md transition-all cursor-pointer" onClick={() => onNavigate('games')}>
         <div className="absolute -right-5 -top-5 bg-white/40 w-32 h-32 rounded-full blur-2xl"></div>
         <Gamepad2 className="absolute -bottom-6 -right-6 text-[#A855F7] opacity-10 rotate-12 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500" size={140} />
         <Sparkles className="absolute top-1/2 right-10 text-[#C084FC] opacity-20 animate-pulse" size={40} />
         
         <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                     <div className="bg-white p-2.5 rounded-xl text-[#C084FC] shadow-sm border border-purple-100 group-hover:scale-110 transition-transform"><Gamepad2 size={24} strokeWidth={2.5} /></div>
                     Finly Games
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 ml-1">Asah otak bisnis & dapatkan poin!</p>
               </div>
               <div className="bg-white px-3 py-1.5 rounded-full text-[10px] font-bold text-[#C084FC] shadow-sm border border-purple-100 flex items-center gap-1 animate-bounce">
                  <Trophy size={14} className="text-yellow-400 fill-yellow-400" /> +50 Poin
               </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white shadow-sm mb-4 relative group-hover:translate-x-1 transition-transform">
               <span className="text-[10px] font-extrabold text-[#C084FC] bg-purple-50 px-2 py-1 rounded-md mb-2 inline-block border border-purple-100">Daily Trivia</span>
               <p className="text-sm font-bold text-slate-700 leading-snug">"Apa istilah ekonomi untuk kondisi di mana harga barang naik secara terus-menerus?"</p>
            </div>
            <button className="w-full py-3.5 bg-[#C084FC] text-white rounded-2xl font-bold text-sm shadow-lg shadow-purple-200 hover:bg-[#A855F7] active:scale-95 transition-all flex items-center justify-center gap-2"><Brain size={18} /> Main Sekarang</button>
         </div>
      </div>

      {/* ECO GREEN */}
      <div className="mt-6 bg-[#F0FDF4] rounded-[32px] p-6 relative overflow-hidden border border-[#A7D7C5]/30 shadow-sm group hover:shadow-md transition-all">
          <Wind size={140} className="absolute -top-10 -right-10 text-[#A7D7C5]/20 rotate-12 transition-transform group-hover:rotate-45 duration-700"/>
          <div className="relative z-10">
             <h4 className="font-bold text-slate-800 text-lg mb-1 flex items-center gap-2"><Wind size={18} className="text-[#A7D7C5]" /> Finly Eco-Green</h4>
             <p className="text-xs text-slate-500 mb-4 font-medium">Dampak positif Anda untuk bumi bulan ini.</p>
             <div className="flex items-center gap-3">
                 <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl text-center min-w-[85px] shadow-sm border border-white/50"><Wind size={20} className="mx-auto text-[#A7D7C5] mb-1"/><span className="text-xs font-bold text-slate-700 block">120 Lbr</span></div>
                 <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl text-center min-w-[85px] shadow-sm border border-white/50"><Droplets size={20} className="mx-auto text-[#8ECAE6] mb-1"/><span className="text-xs font-bold text-slate-700 block">45 kWh</span></div>
                 <div className="flex-1 text-right pl-4"><button className="bg-[#A7D7C5] text-white px-4 py-3 rounded-2xl text-xs font-bold shadow-lg shadow-green-200 hover:bg-[#86c7b0] transition-all w-full active:scale-95 flex items-center justify-center gap-2"><Sparkles size={14} /> Klaim Reward</button></div>
             </div>
          </div>
      </div>

      {/* BANK HIMBARA */}
      <div className="mt-8">
         <h3 className="text-lg font-bold text-slate-800 mb-4 px-2 flex items-center gap-2"><Landmark size={20} className="text-[#8ECAE6]"/> Akses Bank Himbara</h3>
         <div className="grid grid-cols-5 gap-3">
            {[
               { name: 'Mandiri', url: 'https://www.bankmandiri.co.id/', color: 'amber' },
               { name: 'BRI', url: 'https://bri.co.id/', color: 'blue' },
               { name: 'BNI', url: 'https://www.bni.co.id/', color: 'orange' },
               { name: 'BTN', url: 'https://www.btn.co.id/', color: 'indigo' },
               { name: 'BSI', url: 'https://www.bankbsi.co.id/', color: 'emerald' }
            ].map((bank, idx) => (
               <button key={idx} onClick={() => openExternalLink(bank.url)} className="bg-white p-3 rounded-[24px] shadow-sm flex flex-col items-center gap-2 border border-slate-50 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all active:scale-95 group">
                  <div className={`w-12 h-12 rounded-2xl bg-${bank.color}-50 flex items-center justify-center text-${bank.color}-500 shadow-inner group-hover:scale-105 transition-transform`}><Landmark size={22} /></div>
                  <span className="text-[9px] font-bold text-slate-600 text-center leading-tight group-hover:text-slate-800">{bank.name}</span>
               </button>
            ))}
         </div>
      </div>

      {/* E-WALLET */}
      <div className="mt-8">
         <h3 className="text-lg font-bold text-slate-800 mb-4 px-2 flex items-center gap-2"><Wallet size={20} className="text-[#FF8FAB]"/> Dompet Digital</h3>
         <div className="grid grid-cols-4 gap-3">
            {[
               { name: 'GoPay', url: 'https://gopay.co.id/', color: 'sky' },
               { name: 'OVO', url: 'https://www.ovo.id/', color: 'purple' },
               { name: 'DANA', url: 'https://www.dana.id/', color: 'blue' },
               { name: 'LinkAja', url: 'https://www.linkaja.id/', color: 'red' },
               { name: 'ShopeePay', url: 'https://shopeepay.co.id/', color: 'orange' },
               { name: 'Sakuku', url: 'https://www.bca.co.id/', color: 'indigo' },
               { name: 'Jenius', url: 'https://www.jenius.com/', color: 'cyan' }
            ].map((wallet, idx) => (
               <button key={idx} onClick={() => openExternalLink(wallet.url)} className="bg-white p-3 rounded-[24px] shadow-sm flex flex-col items-center gap-2 border border-slate-50 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all active:scale-95 group">
                  <div className={`w-12 h-12 rounded-2xl bg-${wallet.color}-50 flex items-center justify-center text-${wallet.color}-600 shadow-inner group-hover:scale-105 transition-transform`}><Wallet size={22} /></div>
                  <span className="text-[9px] font-bold text-slate-600 text-center leading-tight group-hover:text-slate-800">{wallet.name}</span>
               </button>
            ))}
         </div>
      </div>

      {/* OMNICHANNEL */}
      <div className="mt-8 mb-6">
         <h3 className="text-lg font-bold text-slate-800 mb-4 px-2 flex items-center gap-2"><ShoppingBag size={20} className="text-[#FF8FAB]"/> Akses Digital</h3>
         <div className="grid grid-cols-4 gap-3">
            {[
               { name: 'Shopee', url: 'https://shopee.co.id/', icon: ShoppingBag, color: 'orange' },
               { name: 'Tokopedia', url: 'https://www.tokopedia.com/', icon: Store, color: 'green' },
               { name: 'Instagram', url: 'https://www.instagram.com/', icon: Instagram, color: 'pink' },
               { name: 'WhatsApp', url: 'https://web.whatsapp.com/', icon: MessageCircle, color: 'green' }
            ].map((app, idx) => (
               <button key={idx} onClick={() => openExternalLink(app.url)} className="bg-white p-4 rounded-[24px] shadow-sm flex flex-col items-center gap-2 border border-slate-50 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all active:scale-95 group">
                  <div className={`w-12 h-12 rounded-2xl bg-${app.color}-50 flex items-center justify-center text-${app.color}-500 relative group-hover:scale-105 transition-transform`}><app.icon size={20} /><ExternalLink size={10} className="absolute top-2 right-2 opacity-50"/></div>
                  <span className="text-[9px] font-bold text-slate-500 group-hover:text-slate-700">{app.name}</span>
               </button>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;