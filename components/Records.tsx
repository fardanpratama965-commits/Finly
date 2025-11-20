import React, { useState } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Calendar, Check, ChevronDown, FileText, Trash2, History, ChevronRight, AlertTriangle, CheckCircle2, Lightbulb, ShieldAlert, BrainCircuit, Camera, Lock, Zap } from 'lucide-react';
import { UserTier } from '../types';

interface RecordsProps {
  tier: UserTier;
  onNavigate?: (tab: string) => void;
}

const Records: React.FC<RecordsProps> = ({ tier, onNavigate }) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const EXPENSE_CATS = [
    { id: 'food', label: 'Makan', icon: '🍔' }, { id: 'transport', label: 'Transpor', icon: '🚗' },
    { id: 'shopping', label: 'Belanja', icon: '🛍️' }, { id: 'bills', label: 'Tagihan', icon: '📄' },
    { id: 'health', label: 'Kesehatan', icon: '💊' }, { id: 'ent', label: 'Hiburan', icon: '🎬' },
    { id: 'material', label: 'Bahan', icon: '📦' }, { id: 'ads', label: 'Iklan', icon: '📢' },
  ];
  const INCOME_CATS = [
    { id: 'sales', label: 'Penjualan', icon: '📈' }, { id: 'service', label: 'Jasa', icon: '🛠️' },
    { id: 'salary', label: 'Gaji', icon: '💰' }, { id: 'invest', label: 'Investasi', icon: '🌱' },
    { id: 'bonus', label: 'Bonus', icon: '🎁' }, { id: 'funding', label: 'Modal', icon: '🏦' },
  ];
  const TRANSACTIONS = [
    { id: 1, title: 'Makan Siang Tim', amount: 150000, type: 'expense', date: 'Hari ini, 12:30', cat: 'Makan' },
    { id: 2, title: 'Penjualan Produk A', amount: 2500000, type: 'income', date: 'Hari ini, 10:00', cat: 'Penjualan' },
    { id: 3, title: 'Iklan Instagram', amount: 500000, type: 'expense', date: 'Kemarin', cat: 'Iklan' },
    { id: 4, title: 'Beli Kopi', amount: 25000, type: 'expense', date: 'Kemarin', cat: 'Makan' },
    { id: 5, title: 'Suntikan Modal', amount: 10000000, type: 'income', date: '20 Okt', cat: 'Modal' },
  ];

  const getAIAnalysis = () => {
    const ratio = 85; // Mock high ratio
    if (tier === UserTier.FREE_TRIAL) {
       if (type === 'expense') return { badge: 'TRIAL MODE', status: 'WASPADA', color: 'text-orange-500', bg: 'bg-orange-50', title: "Analisis Margin (Trial)", desc: "Pengeluaran cukup tinggi.", solution: "Audit pos 'Bahan Baku'.", action: "Audit Pos Biaya" };
       else return { badge: 'TRIAL MODE', status: 'POTENSI', color: 'text-blue-500', bg: 'bg-blue-50', title: "Peluang Skala", desc: "Tren naik.", solution: "Putar profit ke stok.", action: "Lihat Produk" };
    }
    if (tier === UserTier.BASIC) {
       if (type === 'expense') return { badge: 'BASIC', status: 'SEHAT', color: 'text-green-500', bg: 'bg-green-50', title: "Keuangan Aman", desc: "Terkendali.", solution: "Pertahankan.", action: "Cek Budget" };
       return { badge: 'BASIC', status: 'BAGUS', color: 'text-green-500', bg: 'bg-green-50', title: "Uang Masuk!", desc: "Sisihkan tabungan.", solution: "Pindahkan 10% ke dana darurat.", action: "Tabung" };
    }
    // Default mock for others
    return { badge: 'AI INSIGHT', status: 'NORMAL', color: 'text-slate-500', bg: 'bg-slate-50', title: "Analisis Standar", desc: "Data cukup.", solution: "Lanjutkan pencatatan.", action: "Cek Laporan" };
  };

  const insight = getAIAnalysis();
  const isExpense = type === 'expense';
  const themeColor = isExpense ? 'text-[#FF8FAB]' : 'text-[#A7D7C5]';

  const handleNumClick = (n: string) => { if (amount.length < 12) setAmount(p => p + n); };

  return (
    <div className="animate-enter pb-32 space-y-6">
      <div className="flex items-center justify-between px-2"><h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">{isExpense ? 'Catat Pengeluaran' : 'Catat Pemasukan'}</h2></div>
      
      <div className="bg-slate-100 p-1.5 rounded-[20px] flex relative">
           <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-[16px] shadow-sm transition-all duration-500 ${!isExpense ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'}`}></div>
           <button onClick={() => setType('expense')} className={`flex-1 py-3 rounded-xl text-xs font-extrabold relative z-10 flex items-center justify-center gap-2 transition-colors ${isExpense ? 'text-[#FF8FAB]' : 'text-slate-400'}`}><ArrowDownCircle size={18} /> Pengeluaran</button>
           <button onClick={() => setType('income')} className={`flex-1 py-3 rounded-xl text-xs font-extrabold relative z-10 flex items-center justify-center gap-2 transition-colors ${!isExpense ? 'text-[#A7D7C5]' : 'text-slate-400'}`}><ArrowUpCircle size={18} /> Pemasukan</button>
      </div>

      <div className={`rounded-[32px] p-6 border shadow-sm transition-all relative overflow-hidden ${insight.bg} ${isExpense ? 'border-pink-100' : 'border-green-100'}`}>
         <BrainCircuit className={`absolute -right-5 -bottom-5 opacity-10 ${insight.color}`} size={100} />
         <div className="relative z-10">
             <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2"><div className={`p-2 rounded-xl bg-white shadow-sm ${insight.color}`}><Zap size={18} fill="currentColor" /></div><span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/50 px-2 py-1 rounded-md">{insight.badge}</span></div>
                <span className={`text-[10px] font-extrabold px-2 py-1 rounded-lg bg-white ${insight.color} border border-white/50`}>{insight.status}</span>
             </div>
             <h3 className={`font-extrabold text-lg mb-1 ${insight.color}`}>{insight.title}</h3>
             <p className="text-xs text-slate-600 leading-relaxed font-medium">{insight.desc}</p>
             <button onClick={() => setShowSolution(!showSolution)} className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-700 hover:opacity-80 transition-opacity bg-white/60 px-4 py-2.5 rounded-xl w-full justify-between border border-white/50">
                <div className="flex items-center gap-2"><Lightbulb size={16} className={insight.color} />{showSolution ? 'Tutup Saran' : 'Lihat Solusi & Saran'}</div><ChevronDown size={14} className={`transition-transform ${showSolution ? 'rotate-180' : ''}`} />
             </button>
             {showSolution && (
                <div className="mt-3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-white shadow-sm animate-enter">
                   <p className="text-xs font-bold text-slate-700 mb-1">Rekomendasi AI:</p>
                   <p className="text-xs text-slate-500 leading-relaxed mb-3">{insight.solution}</p>
                   <button className={`w-full text-[10px] font-bold text-white px-3 py-3 rounded-xl shadow-md ${isExpense ? 'bg-[#FF8FAB]' : 'bg-[#A7D7C5]'} flex items-center justify-center gap-2`}>{insight.action} <ChevronRight size={12} /></button>
                </div>
             )}
         </div>
      </div>

      <div className={`rounded-[32px] p-6 shadow-lg transition-all duration-500 ${isExpense ? 'bg-gradient-to-b from-white to-pink-50/30 border-pink-100' : 'bg-gradient-to-b from-white to-green-50/30 border-green-100'} border`}>
        <div className="mb-8 text-center relative">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{isExpense ? 'Nominal Keluar' : 'Nominal Masuk'}</p>
           <div className={`text-4xl font-black tracking-tight flex items-center justify-center gap-1 ${themeColor}`}><span className="text-2xl opacity-50">Rp</span>{amount ? parseInt(amount).toLocaleString() : '0'}</div>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-6">
           {(isExpense ? EXPENSE_CATS : INCOME_CATS).map(cat => (
             <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all active:scale-95 ${selectedCategory === cat.id ? (isExpense ? 'bg-pink-100 border-pink-300 shadow-md scale-105' : 'bg-green-100 border-green-300 shadow-md scale-105') : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
                <span className="text-xl">{cat.icon}</span><span className={`text-[9px] font-bold truncate w-full text-center ${selectedCategory === cat.id ? 'text-slate-800' : 'text-slate-400'}`}>{cat.label}</span>
             </button>
           ))}
           <button onClick={() => onNavigate?.('finchat')} className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all group">
               <div className="text-slate-400 group-hover:text-slate-600">{tier === UserTier.BASIC ? <Lock size={20}/> : <Camera size={20}/>}</div>
               <span className="text-[9px] font-bold text-slate-400 group-hover:text-slate-600">Scan Struk</span>
           </button>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-100 mb-6"><FileText size={18} className="text-slate-300" /><input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Catatan..." className="bg-transparent outline-none text-sm font-bold text-slate-700 placeholder-slate-300 w-full"/></div>
        <div className="grid grid-cols-3 gap-3 mb-6 px-2">
           {[1,2,3,4,5,6,7,8,9,'.',0].map(n => (<button key={n} onClick={() => handleNumClick(n.toString())} className="py-3.5 rounded-2xl bg-white border border-slate-50 shadow-sm text-xl font-bold text-slate-600 hover:bg-slate-50 active:scale-90 transition-all">{n}</button>))}
           <button onClick={() => setAmount(a => a.slice(0, -1))} className="py-3.5 rounded-2xl bg-red-50 border border-red-100 shadow-sm text-red-400 flex items-center justify-center active:scale-90"><Trash2 size={22} /></button>
        </div>
        <button disabled={!amount} className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 ${isExpense ? 'bg-[#FF8FAB] shadow-pink-200' : 'bg-[#A7D7C5] shadow-green-200'}`}><Check size={24} strokeWidth={3} /> Simpan</button>
      </div>

      <div>
         <div className="flex justify-between items-end px-2 mb-4 mt-8"><h3 className="font-bold text-slate-800 flex items-center gap-2"><History size={18} className="text-slate-400" /> Semua Transaksi</h3></div>
         <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
             <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100"><tr><th className="p-4">Detail</th><th className="p-4">Kategori</th><th className="p-4">Tanggal</th><th className="p-4 text-right">Jumlah</th></tr></thead><tbody className="divide-y divide-slate-50">{TRANSACTIONS.map((trx) => (<tr key={trx.id} className="group hover:bg-slate-50"><td className="p-4 font-bold text-slate-700">{trx.title}</td><td className="p-4"><span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold">{trx.cat}</span></td><td className="p-4 text-slate-500 font-medium">{trx.date}</td><td className={`p-4 text-right font-extrabold ${trx.type === 'income' ? 'text-[#A7D7C5]' : 'text-[#FF8FAB]'}`}>{trx.type === 'income' ? '+' : '-'} {parseInt(trx.amount.toString()).toLocaleString()}</td></tr>))}</tbody></table></div>
         </div>
      </div>
    </div>
  );
};

export default Records;