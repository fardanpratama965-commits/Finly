import React, { useState } from 'react';
import { UserTier } from '../types';
import { MOCK_ANALYTICS_DATA } from '../constants';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, ComposedChart, Line, CartesianGrid, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Sparkles, Zap, PieChart as PieIcon, BrainCircuit, BarChart3, History } from 'lucide-react';

interface AnalyticsProps {
  tier: UserTier;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white text-xs min-w-[150px]">
        <p className="font-extrabold text-slate-700 mb-3 text-sm border-b border-slate-100 pb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: entry.color || entry.stroke || entry.fill }}></div>
              <span className="text-slate-500 capitalize font-medium">{entry.name === 'forecast' ? 'AI Prediksi' : entry.name}:</span>
            </div>
            <span className="font-bold text-slate-800">{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics: React.FC<AnalyticsProps> = ({ tier }) => {
  const data = MOCK_ANALYTICS_DATA[tier];
  const [showForecast, setShowForecast] = useState(false);
  const [timeRange, setTimeRange] = useState<'1Y' | '3Y' | '5Y'>('5Y');

  // PASTEL PALETTE
  const BLUE = "#8ECAE6";
  const PINK = "#FF8FAB";
  const MINT = "#A7D7C5";
  const PURPLE = "#CDB4DB";

  return (
    <div className="animate-enter pb-32 space-y-6">
       {/* HEADER SUMMARY */}
       <div className="grid grid-cols-3 gap-3">
          {data.summary.map((item: any, idx: number) => (
             <div key={idx} className="bg-white/80 backdrop-blur-xl p-4 rounded-[24px] shadow-sm border border-white flex flex-col items-center justify-center text-center group hover:shadow-md transition-all">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label.split(' ')[0]}</p>
                <p className="text-sm sm:text-base font-extrabold text-slate-800">{item.value}</p>
                <div className={`flex items-center mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full ${item.trend === 'up' ? 'bg-green-50 text-[#A7D7C5]' : 'bg-pink-50 text-[#FF8FAB]'}`}>
                   {item.trend === 'up' ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                   {item.change}
                </div>
             </div>
          ))}
       </div>

       {/* --- HERO: SOPHISTICATED REVENUE CURVE --- */}
       <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white relative overflow-hidden">
          
          <div className="flex justify-between items-start mb-6 relative z-10">
             <div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-2 bg-blue-50 rounded-xl text-[#8ECAE6]">
                        <Zap size={18} fill="#8ECAE6" />
                    </div>
                    <h3 className="font-bold text-slate-700 text-lg">Kurva Pendapatan</h3>
                </div>
                <p className="text-xs text-slate-400 ml-1 font-medium">Analisis tren & prediksi masa depan.</p>
             </div>
             
             <button 
               onClick={() => setShowForecast(!showForecast)}
               className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold transition-all border ${showForecast ? 'bg-[#FF8FAB] text-white border-[#FF8FAB] shadow-lg shadow-pink-200' : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200'}`}
             >
               <BrainCircuit size={14} />
               {showForecast ? 'AI Forecast ON' : 'AI Forecast OFF'}
             </button>
          </div>

          <div className="h-[280px] w-full -ml-2">
             <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data.revenueCurve}>
                   <defs>
                      <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor={BLUE} stopOpacity={0.4}/>
                         <stop offset="95%" stopColor={BLUE} stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor={PINK} stopOpacity={0.2}/>
                         <stop offset="95%" stopColor={PINK} stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#cbd5e1', fontWeight: 700}} dy={10} />
                   <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '5 5' }} />
                   
                   {/* ACTUAL DATA (Solid) */}
                   <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stroke={BLUE} 
                      strokeWidth={4} 
                      fill="url(#colorActual)" 
                      animationDuration={1500}
                   />

                   {/* FORECAST DATA (Dashed/Line) - Only shows if toggle is ON */}
                   {showForecast && (
                     <Area 
                        type="monotone" 
                        dataKey="forecast" 
                        stroke={PINK} 
                        strokeWidth={3} 
                        strokeDasharray="5 5"
                        fill="url(#colorForecast)"
                        animationDuration={1500}
                     />
                   )}
                </ComposedChart>
             </ResponsiveContainer>
          </div>

          {/* AI Insight Footer */}
          {showForecast && (
             <div className="mt-4 bg-gradient-to-r from-[#FFF0F3] to-white p-4 rounded-2xl border border-pink-50 flex items-start gap-3 animate-enter">
                <Sparkles size={16} className="text-[#FF8FAB] mt-1 shrink-0" />
                <div>
                   <p className="text-xs font-bold text-slate-700 mb-1">Finly AI Insight</p>
                   <p className="text-[10px] text-slate-500 leading-relaxed">
                      Berdasarkan tren saat ini, pendapatan diprediksi naik <span className="text-[#FF8FAB] font-bold">18%</span> dalam 2 bulan ke depan. Disarankan untuk menambah stok inventaris minggu depan.
                   </p>
                </div>
             </div>
          )}
       </div>
        
       {/* --- ENTERPRISE EXCLUSIVE: HISTORICAL PERFORMANCE --- */}
       {tier === UserTier.ENTERPRISE && data.historicalPerformance && (
         <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white">
            <div className="flex justify-between items-start mb-6">
               <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                  <div className="bg-slate-100 p-2 rounded-xl text-slate-500">
                     <History size={18} />
                  </div>
                  Riwayat Performa
               </h3>
               <div className="flex bg-slate-50 p-1 rounded-xl">
                  {['1Y', '3Y', '5Y'].map(range => (
                     <button 
                        key={range}
                        onClick={() => setTimeRange(range as any)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${timeRange === range ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                     >
                        {range}
                     </button>
                  ))}
               </div>
            </div>
            
            <div className="h-[250px] w-full -ml-2">
               <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={data.historicalPerformance}>
                     <CartesianGrid vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#cbd5e1'}} dy={5}/>
                     <YAxis yAxisId="left" orientation="left" hide />
                     <YAxis yAxisId="right" orientation="right" hide />
                     <Tooltip content={<CustomTooltip />} />
                     <Legend iconSize={8} wrapperStyle={{fontSize: '10px', paddingTop: '10px'}} />
                     
                     <Bar yAxisId="left" dataKey="ebitda" name="EBITDA (M)" fill={BLUE} radius={[4,4,4,4]} barSize={20} />
                     <Line yAxisId="right" type="monotone" dataKey="revenueGrowth" name="Rev Growth (%)" stroke={MINT} strokeWidth={3} dot={{r: 4}} />
                     <Line yAxisId="right" type="monotone" dataKey="riskScore" name="Risk Score" stroke={PINK} strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </ComposedChart>
               </ResponsiveContainer>
            </div>
         </div>
       )}

       {/* --- PRO EXCLUSIVE: REVENUE VS EXPENSES (SIDE-BY-SIDE) --- */}
       {tier === UserTier.PRO && data.revenueExpenses && (
         <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                <div className="bg-blue-50 p-2 rounded-xl text-[#8ECAE6]">
                   <BarChart3 size={18}/>
                </div>
                Pendapatan vs Pengeluaran
            </h3>
            <div className="h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.revenueExpenses}>
                     <CartesianGrid vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#cbd5e1'}} />
                     <Tooltip content={<CustomTooltip />} />
                     <Legend iconType="circle" wrapperStyle={{fontSize: '10px', paddingTop: '10px'}} />
                     <Bar dataKey="revenue" name="Pendapatan" fill={BLUE} radius={[4,4,4,4]} />
                     <Bar dataKey="expenses" name="Pengeluaran" fill={PINK} radius={[4,4,4,4]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
       )}

       {/* --- SECONDARY CHARTS GRID --- */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. FINANCIAL DNA (Donut) */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white">
              <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                 <div className="bg-purple-50 p-2 rounded-xl text-[#CDB4DB]">
                    <PieIcon size={18} />
                 </div>
                 Financial DNA
              </h3>
              <div className="h-[200px] relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={data.spendingDNA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          cornerRadius={10}
                       >
                          {data.spendingDNA?.map((entry: any, index: number) => (
                             <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                          ))}
                       </Pie>
                       <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                 </ResponsiveContainer>
                 {/* Center Text */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Spend</span>
                    <p className="text-lg font-extrabold text-slate-700">100%</p>
                 </div>
              </div>
              <div className="flex justify-center gap-4 flex-wrap mt-2">
                 {data.spendingDNA?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-1.5">
                       <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                       <span className="text-[9px] font-bold text-slate-500">{item.name}</span>
                    </div>
                 ))}
              </div>
          </div>

          {/* 2. PROFIT & LOSS (Pro/Enterprise) OR SPENDING BAR (Basic) */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white">
             <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                 <div className="bg-green-50 p-2 rounded-xl text-[#A7D7C5]">
                    {tier === UserTier.BASIC ? <BarChart3 size={18}/> : <TrendingUp size={18}/>}
                 </div>
                 {tier === UserTier.BASIC ? 'Pengeluaran Bulanan' : 'Profitabilitas'}
             </h3>
             <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                   {tier === UserTier.BASIC ? (
                      <BarChart data={data.spendingDNA}>
                         <CartesianGrid vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#cbd5e1'}} interval={0} />
                         <Tooltip content={<CustomTooltip />} />
                         <Bar dataKey="value" radius={[8,8,8,8]}>
                            {data.spendingDNA?.map((entry: any, index: number) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Bar>
                      </BarChart>
                   ) : (
                      <ComposedChart data={data.profitAndLoss}>
                         <CartesianGrid vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#cbd5e1'}} />
                         <Tooltip content={<CustomTooltip />} />
                         <Bar dataKey="revenue" fill={BLUE} radius={[6,6,6,6]} barSize={8} />
                         <Bar dataKey="cogs" fill={PINK} radius={[6,6,6,6]} barSize={8} />
                         <Line type="monotone" dataKey="netProfit" stroke={MINT} strokeWidth={3} dot={false} />
                      </ComposedChart>
                   )}
                </ResponsiveContainer>
             </div>
          </div>

       </div>
    </div>
  );
};

export default Analytics;