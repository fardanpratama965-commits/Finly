import React from 'react';
import { UserTier } from '../types';
import { Gamepad2, Trophy, Brain, Zap, Star, TrendingUp, Gift, ChevronRight } from 'lucide-react';

interface GamesProps {
  tier: UserTier;
}

const Games: React.FC<GamesProps> = ({ tier }) => {
  return (
    <div className="animate-enter pb-24 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1 flex items-center gap-2">
            <Gamepad2 className="text-[#C084FC]" size={28} /> Finly Games
          </h2>
          <p className="text-slate-400 text-xs font-medium">
            Mainkan quiz, asah skill bisnis, raih poin! 🎮
          </p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
           <div className="bg-yellow-100 p-1 rounded-full">
              <Trophy size={14} className="text-yellow-600" fill="currentColor" />
           </div>
           <span className="font-extrabold text-slate-700">1.250 Poin</span>
        </div>
      </div>

      {/* 1. DAILY CHALLENGE CARD */}
      <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] rounded-[32px] p-6 relative overflow-hidden shadow-md border border-[#D8B4FE]">
         {/* Decor */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl -mr-10 -mt-10"></div>
         <Brain className="absolute -bottom-5 -right-5 text-[#A855F7] opacity-10 rotate-12" size={120} />

         <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
               <span className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-lg text-[10px] font-bold text-[#9333EA] border border-white/50">
                  DAILY TRIVIA
               </span>
               <span className="text-xs font-bold text-[#9333EA] flex items-center gap-1 bg-white/40 px-2 py-1 rounded-lg">
                  <Zap size={12} fill="currentColor"/> +50 XP
               </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 leading-snug mb-3">
               "Apa istilah ekonomi untuk kondisi di mana harga barang naik secara terus-menerus?"
            </h3>
            
            <div className="space-y-2">
               <button className="w-full py-3 px-4 bg-white/80 hover:bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-[#9333EA] text-left transition-all shadow-sm active:scale-98 border border-transparent hover:border-[#D8B4FE]">
                  A. Deflasi
               </button>
               <button className="w-full py-3 px-4 bg-white/80 hover:bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-[#9333EA] text-left transition-all shadow-sm active:scale-98 border border-transparent hover:border-[#D8B4FE]">
                  B. Inflasi
               </button>
               <button className="w-full py-3 px-4 bg-white/80 hover:bg-white rounded-xl text-sm font-bold text-slate-600 hover:text-[#9333EA] text-left transition-all shadow-sm active:scale-98 border border-transparent hover:border-[#D8B4FE]">
                  C. Stagnasi
               </button>
            </div>
         </div>
      </div>

      {/* 2. MINI GAMES GRID */}
      <div>
         <h3 className="font-bold text-slate-800 mb-4 px-2 text-lg">Mini Games</h3>
         <div className="grid grid-cols-2 gap-4">
            {/* Game 1 */}
            <button className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-50 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all group">
               <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#8ECAE6] group-hover:scale-110 transition-transform">
                  <TrendingUp size={28} />
               </div>
               <div>
                  <h4 className="font-bold text-slate-700">Simulasi Pasar</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Tebak tren grafik</p>
               </div>
            </button>

            {/* Game 2 */}
            <button className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-50 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all group">
               <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                  <Star size={28} fill="currentColor" />
               </div>
               <div>
                  <h4 className="font-bold text-slate-700">Quiz Istilah</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Asah kosakata bisnis</p>
               </div>
            </button>
         </div>
      </div>

      {/* 3. REWARDS SHOP */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white">
         <div className="flex justify-between items-end mb-4">
             <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <Gift size={20} className="text-[#FF8FAB]" /> Tukar Poin
             </h3>
             <button className="text-[10px] font-bold text-[#8ECAE6] flex items-center gap-1">
                Lihat Semua <ChevronRight size={12} />
             </button>
         </div>
         
         <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-100">
               <div className="w-12 h-12 bg-[#A7D7C5] rounded-xl flex items-center justify-center text-white shadow-sm">
                  <Zap size={20} fill="currentColor" />
               </div>
               <div className="flex-1">
                  <h4 className="font-bold text-slate-700 text-sm">Voucher Diskon 20%</h4>
                  <p className="text-[10px] text-slate-400">Untuk langganan Pro</p>
               </div>
               <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-[#A7D7C5] hover:text-white hover:border-[#A7D7C5] transition-colors">
                  500 Poin
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Games;