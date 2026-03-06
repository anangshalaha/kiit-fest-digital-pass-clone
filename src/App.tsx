/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Calendar, 
  QrCode, 
  Zap, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  LogOut,
  ChevronRight,
  User,
  CreditCard,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import Barcode from 'react-barcode';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
    <img 
      src="/kiitfest-icon.avif" 
      alt="KIIT Fest Logo" 
      className="w-full h-full object-contain"
      referrerPolicy="no-referrer"
    />
  </div>
);

const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <header className="flex items-center justify-between p-4 bg-[#0D0D0D] sticky top-0 z-40 border-b border-white/5">

    <Logo className="w-12 h-12" />

    <button onClick={onMenuOpen} className="text-white p-1">
      <Menu size={28} />
    </button>

  </header>
);

const SideMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        />
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#B01E42] z-50 p-6 flex flex-col shadow-2xl"
        >
          <div className="flex flex-col items-center mb-12 relative">

  <button onClick={onClose} className="absolute right-0 text-white p-1">
    <X size={32} />
  </button>

  <img
    src="/kiitfest-logo.avif"
    alt="KIIT Fest Logo"
    className="w-28 object-contain"
  />

</div>

          <nav className="flex flex-col gap-4 flex-1">
            {['HOME', 'DASHBOARD', 'ABOUT', 'EVENTS', 'CONTACT'].map((item) => (
              <button 
                key={item}
                className="flex items-center justify-between text-white text-2xl font-black tracking-tighter py-2 border-b border-white/10 group"
              >
                {item}
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#B01E42] transition-colors">
                  <ArrowRight size={18} className="-rotate-45" />
                </div>
              </button>
            ))}
          </nav>

          <button className="mt-auto flex items-center gap-3 text-white font-bold text-lg py-4 border-t border-white/10">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <LogOut size={20} />
            </div>
            LOGOUT
          </button>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const AccessPassModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [tab, setTab] = useState<'QR' | 'BAR'>('QR');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-10 bg-white z-50 flex flex-col overflow-y-auto rounded-t-[2.5rem] shadow-2xl"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="text-pink-500" size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="font-poppins font-black text-2xl leading-none uppercase tracking-tighter text-gray-900">Access Granted</span>
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">Verified Security Clearance</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <X size={24} className="text-gray-900" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center gap-8 pb-20">
              {/* Tabs */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full max-w-xs">
                <button 
                  onClick={() => setTab('QR')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-black text-sm transition-all duration-300",
                    tab === 'QR' ? "bg-pink-500 text-white shadow-lg scale-[1.02]" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  QR
                </button>
                <button 
                  onClick={() => setTab('BAR')}
                  className={cn(
                    "flex-1 py-3 rounded-xl font-black text-sm transition-all duration-300",
                    tab === 'BAR' ? "bg-pink-500 text-white shadow-lg scale-[1.02]" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  BAR
                </button>
                <button className="px-3 text-gray-400 hover:rotate-180 transition-transform duration-500">
                  <RefreshCw size={20} />
                </button>
              </div>

              {/* Code Display */}
              <motion.div 
                layout
                className="w-full aspect-square max-w-[320px] border-8 border-gray-50 rounded-[3rem] flex items-center justify-center p-8 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative"
              >
                {tab === 'QR' ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                  >
                    <QRCodeSVG 
                      value="KIIT-FEST-7-ANANGSHA-LAHA" 
                      size={240}
                      level="H"
                      includeMargin={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white">
                        <Logo className="w-10 h-10" />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rotate-90 scale-[1.8]"
                  >
                    <Barcode 
                      value="23052288" 
                      width={1.2} 
                      height={80} 
                      displayValue={false}
                      background="transparent"
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Protocols */}
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col">
                  <h3 className="font-poppins font-black text-2xl italic uppercase tracking-tighter text-pink-500">Entry Protocols</h3>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">Security Clearance Checklist</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  {[
                    { icon: QrCode, title: "Digital QR Pass", desc: "Scan this pass mandatory at gate." },
                    { icon: User, title: "ID Verification", desc: "Carry University or institutional ID card." },
                    { icon: CreditCard, title: "Payment Proof", desc: "Keep digital payment receipt ready." },
                    { icon: RefreshCw, title: "Auto Refresh", desc: "The QR code refreshes every 1 min for enhanced security." },
                    { icon: LogOut, title: "One-Time Entry", desc: "No re-entry allowed after exiting." },
                  ].map((item, i) => (
                    <motion.div 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-gray-100 transition-colors cursor-default"
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                        <item.icon className="text-pink-500" size={24} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-sm text-gray-900 leading-tight">{i + 1}. {item.title}</span>
                        <span className="text-[11px] text-gray-500 font-medium">{item.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto p-6 flex items-center justify-center gap-3 text-gray-400 font-mono text-sm border-t border-gray-100 bg-gray-50/50">
              <Clock size={18} className="text-pink-500" />
              <span className="font-bold tracking-widest">{time}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-pink-500/30">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AccessPassModal isOpen={isPassOpen} onClose={() => setIsPassOpen(false)} />

      <main className="p-4 flex flex-col gap-6 max-w-md mx-auto">
        {/* Pass Section */}
        <section className="relative overflow-hidden rounded-[2rem] bg-[#1A1A1A] p-8 border border-white/5">
          <div className="absolute top-4 right-8">
            <span className="text-white/10 font-black text-6xl italic leading-none">04 MAR</span>
          </div>
          <div className="relative z-10 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-2xl border border-pink-500/30 flex items-center justify-center bg-pink-500/5">
              <Calendar className="text-pink-500" size={24} />
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-3xl font-poppins font-black italic uppercase tracking-tighter leading-none">Digital Pass</h2>
              <h2 className="text-3xl font-poppins font-black italic uppercase tracking-tighter leading-none text-white/40">Deployment</h2>
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-[200px]">
              Your official gate pass and security credentials will materialize here on <span className="text-white font-bold">March 4th</span>.
            </p>

            <button 
              onClick={() => setIsPassOpen(true)}
              className="bg-white text-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-tighter hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Reveal Access Pass
              <QrCode size={20} />
            </button>
          </div>
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </section>

        {/* Arena Section */}
        <section className="rounded-[2rem] bg-gradient-to-br from-[#B01E42] to-[#7A142D] p-6 border border-white/10 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Zap className="text-white" size={20} fill="white" />
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-2xl font-poppins font-black italic uppercase tracking-tighter leading-none">Ready for</h3>
              <h3 className="text-2xl font-poppins font-black italic uppercase tracking-tighter leading-none">the Arena?</h3>
            </div>

            <p className="text-white/80 text-xs leading-relaxed max-w-[220px]">
              Browse the high-octane events lineup and secure your spot in the history books.
            </p>

            <button className="bg-white text-black py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-tighter text-sm self-start group-hover:gap-4 transition-all">
              Enter Arena
              <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="absolute -right-4 -bottom-4 text-white/10 font-black text-9xl italic select-none">GO</div>
        </section>

        {/* Guidelines Section */}
        <section className="rounded-[2rem] bg-[#1A1A1A] p-6 border border-white/5 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <FileText className="text-pink-500" size={20} />
            </div>
            <div className="flex flex-col flex-1">
              <h4 className="font-poppins font-black italic uppercase tracking-tighter text-lg leading-none">Entry Guidelines</h4>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Before arriving at the gate, read the official entry document.</p>
            </div>
          </div>
          
          <button className="bg-white/5 hover:bg-white/10 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-tighter text-sm border border-white/10 transition-all">
            View Guidelines
            <ArrowRight size={18} />
          </button>
        </section>

        {/* Profile Card */}
        <section className="rounded-[2rem] bg-[#1A1A1A] p-6 border border-white/5 flex flex-col items-center gap-4 relative overflow-hidden">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-600 p-1">
              <div className="w-full h-full bg-[#1A1A1A] rounded-[1.25rem] flex items-center justify-center overflow-hidden">
                <img 
                  src="Screenshot 2026-03-07 004828.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full shadow-lg whitespace-nowrap border-2 border-[#1A1A1A]">
              Verified Participant
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
             <h4 className="font-schabo text-s condensed text-white/80">Anangsha Laha</h4>
             <span className="text-white/40 text-xs font-mono">23051163@kiit.ac.in</span>
           </div>

          <div className="flex items-center gap-4 w-full pt-2 border-t border-white/5">
            <div className="flex-1 flex flex-col items-center">
              <span className="text-white/20 text-[8px] font-black uppercase tracking-widest">Gender</span>
              <span className="text-white/60 text-xs font-bold">Female</span>
            </div>
            <div className="w-px h-6 bg-white/5" />
            <div className="flex-1 flex flex-col items-center">
              <span className="text-white/20 text-[8px] font-black uppercase tracking-widest">Entry</span>
              <span className="text-white/60 text-xs font-bold">GATE 131</span>
            </div>
          </div>

          {/* Background Mascot/Icon */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
            <div className="w-20 h-20 bg-pink-500 rounded-full blur-3xl" />
          </div>
        </section>

        <footer className="py-8 text-center">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">KIIT Fest 7.0 &copy; 2026</p>
        </footer>
      </main>
    </div>
  );
}
