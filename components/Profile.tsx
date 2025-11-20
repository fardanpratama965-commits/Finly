import React from 'react';
import { UserProfile, UserTier } from '../types';
import { Headphones, HelpCircle, Globe, Shield, Bell, LogOut, ChevronRight, Star, Heart, CreditCard, User } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
  onToggleEmail: (enabled: boolean) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onToggleEmail }) => {
  
  return (
    <div className="animate-enter pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Akun Saya</h2>
         <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100">
            <User size={20} className="text-slate-400"/>
         </div>
      </div>

      {/* 1. Membership Card (Holographic Style) */}
      <div className="relative w-full h-52 rounded-[32px] overflow-hidden shadow-xl transition-transform hover:scale-[1.02] duration-500 group cursor-pointer">
         {/* Dynamic Background based on Tier */}
         <div className={`absolute inset-0 ${
            user.tier === UserTier.BASIC ? 'bg-gradient-to-br from-[#8ECAE6] to-[#219ebc]' :
            user.tier === UserTier.PRO ? 'bg-gradient-to-br from-[#FF8FAB] to-[#fb6f92]' :
            'bg-gradient-to-br from-slate-800 to-slate-900'
         }`}></div>
         
         {/* Decorative Elements */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
         <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full blur-2xl -ml-5 -mb-5"></div>
         <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

         {/* Content */}
         <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Finly Member</p>
                  <h3 className="text-2xl font-extrabold tracking-tight">{user.tier}</h3>
               </div>
               <CreditCard size={24} className="opacity-80" />
            </div>
            
            <div>
               <p className="text-[10px] font-bold opacity-70 mb-1">Card Holder</p>
               <div className="flex justify-between items-end">
                  <p className="text-lg font-bold tracking-wide truncate max-w-[200px]">{user.name || 'Guest User'}</p>
                  {/* Fake Chip Visual */}
                  <div className="flex items-center gap-1 opacity-80">
                     <div className="w-8 h-5 border border-white/50 rounded-md flex items-center justify-center bg-white/10 backdrop-blur-sm">
                        <div className="w-5 h-3 border border-white/50 rounded-[2px]"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 2. Activity Stats (Wishlist/Review) */}
      <div className="grid grid-cols-2 gap-4">
         <button className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-50 flex flex-col gap-2 hover:bg-slate-50 transition-colors text-left group active:scale-95">
             <div className="bg-pink-50 w-10 h-10 rounded-full flex items-center justify-center text-[#FF8FAB] group-hover:scale-110 transition-transform">
                <Heart size={20} strokeWidth={2.5} />
             </div>
             <div>
                <p className="font-bold text-slate-700">Wishlist</p>
                <p className="text-[10px] text-slate-400 font-medium">0 Item Disimpan</p>
             </div>
         </button>
         <button className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-50 flex flex-col gap-2 hover:bg-slate-50 transition-colors text-left group active:scale-95">
             <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center text-[#8ECAE6] group-hover:scale-110 transition-transform">
                <Star size={20} strokeWidth={2.5} />
             </div>
             <div>
                <p className="font-bold text-slate-700">Ulasan</p>
                <p className="text-[10px] text-slate-400 font-medium">Berikan Penilaian</p>
             </div>
         </button>
      </div>

      {/* 3. Customer Care 24/7 */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white">
         <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
            Customer Care 24/7
            <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-extrabold border border-red-100 animate-pulse">Live</span>
         </h3>
         <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors group border border-slate-100 active:scale-[0.98]">
               <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl text-[#8ECAE6] shadow-sm">
                     <Headphones size={20} />
                  </div>
                  <div className="text-left">
                     <p className="font-bold text-slate-700 text-sm group-hover:text-[#8ECAE6]">Pusat Bantuan</p>
                     <p className="text-[10px] text-slate-400">Hubungi kami jika ada kendala</p>
                  </div>
               </div>
               <ChevronRight size={16} className="text-slate-300 group-hover:text-[#8ECAE6]" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-pink-50 transition-colors group border border-slate-100 active:scale-[0.98]">
               <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-xl text-[#FF8FAB] shadow-sm">
                     <HelpCircle size={20} />
                  </div>
                  <div className="text-left">
                     <p className="font-bold text-slate-700 text-sm group-hover:text-[#FF8FAB]">Bantuan Langsung</p>
                     <p className="text-[10px] text-slate-400">Chat dengan tim support</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#A7D7C5] bg-white px-2 py-1 rounded-lg shadow-sm border border-green-50">Online</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-[#FF8FAB]" />
               </div>
            </button>
         </div>
      </div>

      {/* 4. Settings */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 shadow-sm border border-white">
         <h3 className="font-bold text-slate-800 mb-4 text-lg">Pengaturan</h3>
         <div className="divide-y divide-slate-50">
            {[
               { icon: Globe, label: "Bahasa", val: "Indonesia" },
               { icon: CreditCard, label: "Mata Uang", val: "IDR" },
               { icon: Shield, label: "Keamanan", val: "Biometrik" }
            ].map((item, idx) => (
               <button key={idx} className="w-full flex items-center justify-between py-4 hover:bg-slate-50/50 transition-colors group first:pt-0 active:scale-[0.99]">
                  <div className="flex items-center gap-3">
                     <item.icon size={18} className="text-slate-400 group-hover:text-slate-600" />
                     <span className="text-sm font-bold text-slate-600 group-hover:text-slate-800">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                     {item.val}
                     <ChevronRight size={14} />
                  </div>
               </button>
            ))}
            
            {/* Email Toggle */}
            <div className="w-full flex items-center justify-between py-4 hover:bg-slate-50/50 transition-colors">
               <div className="flex items-center gap-3">
                  <Bell size={18} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">Notifikasi Email</span>
               </div>
               <button 
                  onClick={() => onToggleEmail(!user.emailNotifications)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${user.emailNotifications ? 'bg-[#A7D7C5]' : 'bg-slate-200'}`}
               >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${user.emailNotifications ? 'left-6' : 'left-1'}`}></div>
               </button>
            </div>
         </div>
         
         <button 
            onClick={onLogout}
            className="w-full mt-6 py-4 bg-red-50 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-red-100 active:scale-95"
         >
            <LogOut size={16} />
            Keluar Akun
         </button>
      </div>
      
      {/* Version */}
      <p className="text-center text-[10px] text-slate-300 font-bold tracking-widest uppercase">Finly v2.5.0 (Build 2024)</p>
    </div>
  );
};

export default Profile;