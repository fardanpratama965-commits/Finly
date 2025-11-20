import React from 'react';
import { UserTier, Goal } from '../types';
import { MOCK_GOALS_BASIC, MOCK_GOALS_PRO, MOCK_GOALS_ENTERPRISE, MOCK_ECO_STATS } from '../constants';
import { Target, ArrowRight, Calendar, TrendingUp, Plus, Leaf, Wind, Droplets, Sparkles } from 'lucide-react';

interface GoalsProps {
  tier: UserTier;
}

const GoalCard: React.FC<{ goal: Goal; tier: UserTier }> = ({ goal, tier }) => {
  const percentage = Math.min(100, Math.round((goal.current / goal.target) * 100));
  
  const formatCurrency = (val: number) => {
    if (tier === UserTier.BASIC) return `Rp ${val.toLocaleString('id-ID')}`;
    if (tier === UserTier.ENTERPRISE) return `Rp ${(val/1000000000).toFixed(1)} M`;
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[32px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(142,202,230,0.2)] transition-all duration-500 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-[32px] -mr-4 -mt-4 opacity-50 transition-all group-hover:bg-[#8ECAE6]/10"></div>
      
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div>
          <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-lg mb-3 bg-slate-50 text-slate-500 border border-slate-100">
            {goal.category}
          </span>
          <h4 className="font-bold text-slate-800 text-lg leading-tight">{goal.title}</h4>
        </div>
        <div className="p-3 rounded-2xl bg-[#F0F9FF] text-[#8ECAE6] group-hover:scale-110 transition-transform">
          <Target size={20} />
        </div>
      </div>
      
      <div className="flex items-baseline gap-1 mb-1 relative z-10">
        <span className="text-2xl font-extrabold text-slate-800">{formatCurrency(goal.current)}</span>
      </div>
      <div className="flex justify-between text-xs text-slate-400 mb-6 font-medium relative z-10">
         <span>Goal: {formatCurrency(goal.target)}</span>
         <span className="font-bold text-[#FF8FAB]">{percentage}%</span>
      </div>
      
      {/* Progress Bar with Gradient */}
      <div className="w-full bg-slate-100 rounded-full h-4 mb-6 overflow-hidden p-1 relative z-10 border border-slate-50">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[#8ECAE6] to-[#A7D7C5]" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-slate-50 text-xs font-semibold text-slate-400 relative z-10">
        <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#FF8FAB]" />
            <span>{new Date(goal.deadline).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-1 text-[#A7D7C5] bg-[#F0FDF4] px-2 py-1 rounded-lg">
            <TrendingUp size={12} />
            <span>On Track</span>
        </div>
      </div>
    </div>
  );
};

const Goals: React.FC<GoalsProps> = ({ tier }) => {
  const goals = tier === UserTier.BASIC ? MOCK_GOALS_BASIC : 
                tier === UserTier.PRO ? MOCK_GOALS_PRO : MOCK_GOALS_ENTERPRISE;

  // Safely access eco stats, default to BASIC if not found
  const ecoStats = MOCK_ECO_STATS[tier] || MOCK_ECO_STATS.BASIC;

  return (
    <div className="space-y-6 pb-24 animate-enter">
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-1">
            Target Kamu
          </h2>
          <p className="text-slate-400 text-xs font-medium">
            Progres minggu ini sangat bagus! 🚀
          </p>
        </div>
        <button className="px-5 py-3 bg-[#8ECAE6] text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-300 transition-all active:scale-95 flex items-center gap-2">
          <Plus size={16} strokeWidth={3} /> Tambah
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map(goal => (
          <GoalCard key={goal.id} goal={goal} tier={tier} />
        ))}
        
        {/* Interactive "Add New" Card */}
        <button className="group bg-white/40 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center text-center min-h-[240px] hover:bg-[#8ECAE6]/10 hover:border-[#8ECAE6] transition-all cursor-pointer">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-slate-300 group-hover:text-[#8ECAE6] group-hover:scale-110 transition-all">
            <ArrowRight size={24} />
          </div>
          <h4 className="font-bold text-slate-600 mb-1 group-hover:text-[#8ECAE6]">Langkah Berikutnya</h4>
          <p className="text-xs text-slate-400 px-10 font-medium group-hover:text-slate-500">
            Buat target baru untuk meningkatkan performa.
          </p>
        </button>
      </div>

      {/* ECO GREEN FEATURE (Integrated Below Target) */}
      <div className="mt-8 bg-[#F0FDF4] rounded-[32px] p-8 relative overflow-hidden border border-[#A7D7C5]/30 shadow-sm group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#A7D7C5]/20 to-transparent rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex-1">
                 <h4 className="font-bold text-slate-800 text-xl mb-2 flex items-center gap-2">
                   <div className="bg-white p-2 rounded-xl text-[#A7D7C5] shadow-sm">
                      <Leaf size={20} />
                   </div>
                   Finly Eco-Rewards
                 </h4>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Luar biasa! Pencapaian target digital Anda berkontribusi pada penghematan sumber daya. Klaim reward keberlanjutan Anda.
                 </p>
             </div>
             
             <div className="flex items-center gap-4">
                 <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl text-center min-w-[100px] shadow-sm border border-white/50">
                    <Wind size={24} className="mx-auto text-[#A7D7C5] mb-2"/>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paperless</span>
                    <span className="block text-lg font-extrabold text-slate-700 mt-1">
                        {tier === UserTier.ENTERPRISE ? ecoStats.carbonCredit : ecoStats.paperSaved}
                        <span className="text-xs ml-0.5 font-medium text-slate-400">{tier === UserTier.ENTERPRISE ? 'Ton' : 'lbr'}</span>
                    </span>
                 </div>
                 <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl text-center min-w-[100px] shadow-sm border border-white/50">
                    <Droplets size={24} className="mx-auto text-[#8ECAE6] mb-2"/>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</span>
                    <span className="block text-lg font-extrabold text-slate-700 mt-1">
                        {tier === UserTier.ENTERPRISE ? ecoStats.esgScore : ecoStats.score}
                        <span className="text-xs ml-0.5 font-medium text-slate-400">pts</span>
                    </span>
                 </div>
             </div>

             <button className="bg-[#A7D7C5] text-white px-6 py-4 rounded-2xl text-sm font-bold shadow-lg shadow-green-200 hover:bg-[#86c7b0] transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap">
                <Sparkles size={16} /> Klaim Reward
             </button>
          </div>
      </div>
    </div>
  );
};

export default Goals;