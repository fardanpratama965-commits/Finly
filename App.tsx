import React, { useState, useEffect } from 'react';
import { UserTier, Notification, UserProfile } from './types';
import { TIER_CONFIG } from './constants';
import { MessageSquare, PieChart, Target, Bell, User, Home, UserCircle, Gamepad2, NotebookPen, Share2, Scan, Mail, Check, Sparkles } from 'lucide-react';
import Dashboard from './components/Dashboard';
import FinChat from './components/FinChat';
import Goals from './components/Goals';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import Games from './components/Games';
import Records from './components/Records';

// ==========================================
// LOGO DESIGN LOCKED - FINAL VERSION
// Abstract Black Circle with Pastel Pink & Mint Lines
// ==========================================
const FinlyLogo = ({ size = 32 }: { size?: number }) => (
  <div className="relative select-none rounded-full shadow-md overflow-hidden flex-shrink-0 bg-black" style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="50" cy="50" r="50" fill="black" />
      {/* Abstract Art Lines */}
      <path d="M15 50 C 15 30, 30 15, 50 15" stroke="#FFB7B2" strokeWidth="6" strokeLinecap="round" />
      <path d="M28 52 C 28 42, 35 32, 45 30" stroke="#FFB7B2" strokeWidth="5" strokeLinecap="round" />
      <path d="M60 15 C 75 15, 85 25, 85 50" stroke="#A7D7C5" strokeWidth="6" strokeLinecap="round" />
      <path d="M62 32 C 70 32, 72 38, 74 50" stroke="#A7D7C5" strokeWidth="5" strokeLinecap="round" />
      <path d="M85 60 C 82 80, 70 85, 50 85" stroke="#A7D7C5" strokeWidth="6" strokeLinecap="round" />
      <path d="M40 85 C 25 82, 15 70, 15 55" stroke="#FFB7B2" strokeWidth="6" strokeLinecap="round" />
      <path d="M40 70 C 35 68, 30 62, 30 55" stroke="#FFB7B2" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="6" fill="#FFB7B2" />
    </svg>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(true);
  
  // Login State
  const [inputName, setInputName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [selectedTier, setSelectedTier] = useState<UserTier>(UserTier.FREE_TRIAL);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [greeting, setGreeting] = useState('');
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    tier: UserTier.BASIC,
    emailNotifications: true
  });

  const [showEmailToast, setShowEmailToast] = useState<{show: boolean, message: string}>({show: false, message: ''});
  
  // Navigation Items
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'records', label: 'Catat', icon: NotebookPen },
    { id: 'analytics', label: 'Laporan', icon: PieChart },
    { id: 'finchat', label: 'FinChat', icon: MessageSquare }, // Center
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'goals', label: 'Target', icon: Target },
    { id: 'profile', label: 'Akun', icon: UserCircle }, 
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) setGreeting('Selamat Pagi');
    else if (hour >= 11 && hour < 15) setGreeting('Selamat Siang');
    else if (hour >= 15 && hour < 19) setGreeting('Selamat Sore');
    else setGreeting('Selamat Malam');
  }, []);

  const handleNameSubmit = () => {
    if (inputName.trim().length > 0) setIsNameSubmitted(true);
  };

  const handleLoginComplete = () => {
    setUserProfile({ ...userProfile, name: inputName, tier: selectedTier });
    setShowLoginModal(false);
    setShowWelcomeOverlay(true);
    setTimeout(() => setShowWelcomeOverlay(false), 3500);
  };

  const handleLogout = () => {
    setShowLoginModal(true);
    setActiveTab('home');
    setInputName('');
    setIsNameSubmitted(false);
    setSelectedTier(UserTier.FREE_TRIAL);
    setUserProfile({ name: '', tier: UserTier.BASIC, emailNotifications: true });
  };

  const handleEmailToggle = (enabled: boolean) => {
      setUserProfile(prev => ({...prev, emailNotifications: enabled}));
      setShowEmailToast({ show: true, message: enabled ? "✅ Notifikasi Email Diaktifkan" : "❌ Notifikasi Email Dinonaktifkan" });
      setTimeout(() => setShowEmailToast({show: false, message: ''}), 2000);
  };

  const triggerEmailSimulation = () => {
    const messages: Record<string, string> = {
      [UserTier.FREE_TRIAL]: "Info: Masa uji coba Anda tersisa 13 hari.",
      [UserTier.BASIC]: "Pengingat: Cek sisa anggaran mingguan Anda!",
      [UserTier.PRO]: "Alert: Margin profit turun 2% minggu ini.",
      [UserTier.ENTERPRISE]: "Laporan: Konsolidasi Q3 siap ditinjau."
    };
    setShowEmailToast({ show: true, message: `📧 Email terkirim: "${messages[userProfile.tier] || messages[UserTier.BASIC]}"` });
    setTimeout(() => setShowEmailToast({show: false, message: ''}), 4000);
  };

  const handleShare = () => {
     setShowEmailToast({ show: true, message: "🔗 Link aplikasi disalin! Bagikan ke teman Anda." });
     setTimeout(() => setShowEmailToast({show: false, message: ''}), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 max-w-md mx-auto shadow-2xl relative overflow-hidden border-x border-slate-100">
      
      {/* WELCOME OVERLAY */}
      {showWelcomeOverlay && (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col items-center justify-center p-6 text-center animate-enter max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8ECAE6]/20 via-[#FF8FAB]/10 to-[#A7D7C5]/20 animate-pulse pointer-events-none"></div>
            <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="scale-150 mb-4 animate-bounce" style={{ animationDuration: '3s' }}><FinlyLogo size={80} /></div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-slate-800">Selamat Bergabung!</h2>
                    <h3 className="text-xl font-bold text-[#8ECAE6]">{inputName}</h3>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-[32px] border border-white shadow-xl max-w-xs mx-auto mt-4">
                   <p className="text-slate-600 font-medium leading-relaxed text-sm">
                      Menyiapkan dashboard <span className="block text-lg font-extrabold text-[#FF8FAB] mt-1 uppercase tracking-wider">{TIER_CONFIG[selectedTier]?.label}</span> 
                   </p>
                </div>
            </div>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-3">
           <FinlyLogo size={36} />
           <div className="animate-enter">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{greeting},</p>
              <h1 className="text-sm font-extrabold text-slate-800 leading-none truncate max-w-[120px]">{userProfile.name}</h1>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={triggerEmailSimulation} className="relative p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-[#FF8FAB] active:scale-95 group">
              <Bell size={20} /><span className="absolute top-2 right-2 w-2 h-2 bg-[#FF8FAB] rounded-full border border-white"></span>
           </button>
           <button onClick={handleShare} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#8ECAE6] active:scale-95"><Share2 size={20} /></button>
           <button onClick={() => setActiveTab('profile')} className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8ECAE6] to-[#A7D7C5] p-0.5 active:scale-95">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden"><User size={16} className="text-slate-600" /></div>
           </button>
        </div>
      </header>

      {/* MAIN CONTENT (Keep-Alive Strategy) */}
      <main className="p-6 min-h-[calc(100vh-140px)] relative">
        <div className={activeTab === 'home' ? 'block animate-enter' : 'hidden'}>
          <Dashboard tier={userProfile.tier} onNavigate={setActiveTab} userName={userProfile.name} />
        </div>
        <div className={activeTab === 'records' ? 'block animate-enter' : 'hidden'}>
          <Records tier={userProfile.tier} onNavigate={setActiveTab} />
        </div>
        <div className={activeTab === 'analytics' ? 'block animate-enter' : 'hidden'}>
           <Analytics tier={userProfile.tier} />
        </div>
        <div className={activeTab === 'finchat' ? 'block animate-enter h-full' : 'hidden'}>
           <FinChat tier={userProfile.tier} />
        </div>
        <div className={activeTab === 'games' ? 'block animate-enter' : 'hidden'}>
           <Games tier={userProfile.tier} />
        </div>
        <div className={activeTab === 'goals' ? 'block animate-enter' : 'hidden'}>
           <Goals tier={userProfile.tier} />
        </div>
        <div className={activeTab === 'profile' ? 'block animate-enter' : 'hidden'}>
           <Profile user={userProfile} onLogout={handleLogout} onToggleEmail={handleEmailToggle} />
        </div>
      </main>

      {/* TOAST */}
      {showEmailToast.show && (
         <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-enter w-[90%] max-w-sm">
            <div className="bg-white/20 p-1.5 rounded-full"><Mail size={14} className="text-white"/></div>
            <p className="text-xs font-medium pr-2 truncate">{showEmailToast.message}</p>
         </div>
      )}

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-1 pb-6 pt-2 z-40 max-w-md mx-auto">
        <div className="flex justify-between items-end relative">
           {navItems.map((item) => {
              if (item.id === 'finchat') {
                 return (
                    <div key={item.id} className="relative -top-6 group z-50 mx-0.5">
                       <div className="absolute inset-0 bg-[#FF8FAB] rounded-full blur-md opacity-40 animate-pulse pointer-events-none"></div>
                       <button onClick={() => setActiveTab(item.id)} className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#FF8FAB] to-[#fb6f92] text-white flex items-center justify-center shadow-xl shadow-pink-200 hover:scale-110 transition-transform duration-300 border-4 border-white">
                          <Scan size={22} />
                       </button>
                       <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold transition-colors duration-300 whitespace-nowrap ${activeTab === 'finchat' ? 'text-[#FF8FAB]' : 'text-slate-400'}`}>AI Scan</span>
                    </div>
                 )
              }
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                 <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center gap-0.5 p-1 transition-all duration-300 w-11 active:scale-90 ${isActive ? '-translate-y-1' : ''}`}>
                    <div className={`transition-colors duration-300 ${isActive ? 'text-[#8ECAE6]' : 'text-slate-300 hover:text-slate-400'}`}><Icon size={18} strokeWidth={isActive ? 2.5 : 2} /></div>
                    <span className={`text-[8px] font-bold transition-colors duration-300 whitespace-nowrap ${isActive ? 'text-[#8ECAE6]' : 'text-slate-400'}`}>{item.label}</span>
                    <div className={`w-1 h-1 rounded-full bg-[#8ECAE6] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
                 </button>
              );
           })}
        </div>
      </nav>

      {/* LOGIN MODAL */}
      {showLoginModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gradient-animate font-sans overflow-hidden">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[40px] shadow-2xl p-8 w-full max-w-md relative animate-enter border border-white/50 max-h-[90vh] overflow-y-auto">
           <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
           <div className="relative z-10 flex flex-col items-center">
              <div className="mb-2 flex flex-col items-center">
                 <FinlyLogo size={90} />
                 <h1 className="text-5xl font-extrabold text-slate-800 tracking-tighter mt-4">Finly.</h1>
              </div>
              <h2 className="text-2xl font-bold text-slate-600 mb-2 tracking-tight text-center">{isNameSubmitted ? `Halo, ${inputName}!` : 'Asisten Keuangan AI'}</h2>
              
              {!isNameSubmitted ? (
                <div className="w-full space-y-4 mt-6">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#8ECAE6] transition-colors" size={20} />
                    <input type="text" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Nama Panggilan Anda" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#8ECAE6] focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-700 placeholder:font-normal" onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()} />
                  </div>
                  <button onClick={handleNameSubmit} disabled={!inputName.trim()} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-900 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50">Lanjut</button>
                </div>
              ) : (
                <div className="w-full space-y-3 animate-enter mt-2">
                  {(Object.keys(TIER_CONFIG) as UserTier[]).map((tier) => (
                    <button key={tier} onClick={() => setSelectedTier(tier)} className={`w-full p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${selectedTier === tier ? 'border-[#8ECAE6] bg-blue-50/50' : 'border-slate-100 hover:border-blue-100 bg-white'}`}>
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex flex-col">
                           <span className={`text-sm font-extrabold ${selectedTier === tier ? 'text-[#8ECAE6]' : 'text-slate-700'}`}>{TIER_CONFIG[tier].label}</span>
                           <span className="text-[10px] text-slate-400 font-medium mt-1">{tier === UserTier.FREE_TRIAL ? 'Gratis 14 Hari Penuh' : tier === UserTier.BASIC ? 'Rp 19rb/bulan' : tier === UserTier.PRO ? 'Rp 49rb/bulan' : 'Hubungi Kami'}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedTier === tier ? 'border-[#8ECAE6] bg-[#8ECAE6]' : 'border-slate-200'}`}>{selectedTier === tier && <Check size={14} className="text-white" strokeWidth={4} />}</div>
                      </div>
                    </button>
                  ))}
                  <button onClick={handleLoginComplete} className="w-full py-4 mt-4 bg-[#8ECAE6] text-white rounded-2xl font-bold text-lg hover:bg-[#7abdd9] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-blue-200">Mulai Sekarang</button>
                  <button onClick={() => setIsNameSubmitted(false)} className="w-full text-xs text-slate-400 font-bold hover:text-slate-600 py-2">Kembali</button>
                </div>
              )}
           </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default App;