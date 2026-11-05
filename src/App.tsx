/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  DEFAULT_CONFIG,
  SensiConfig,
  getOrCreateDeviceId,
  launchGamePackage,
} from './utils/sensiLogic';
import { SensiEditor } from './components/SensiEditor';
import { ShizukuEnginePanel } from './components/ShizukuEnginePanel';
import { TouchCanvasSimulator } from './components/TouchCanvasSimulator';
import { ShadoreKnowledgeGuide } from './components/ShadoreKnowledgeGuide';
import { AntiCrackWarning } from './components/AntiCrackWarning';
import { VipLicenseModal } from './components/VipLicenseModal';
import { ScreenshotModal } from './components/ScreenshotModal';
import { GithubPublishModal } from './components/GithubPublishModal';
import { ThreeBackground } from './components/ThreeBackground';
import {
  Crown,
  Target,
  Zap,
  Lock,
  Unlock,
  Github,
  Image as ImageIcon,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<SensiConfig>(DEFAULT_CONFIG);
  const [vipUnlocked, setVipUnlocked] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [deviceId, setDeviceId] = useState('');

  const logoPath = '/assets/aistudio/WhatsApp_Image_2026-11-05_at_11.03.53_PM_a9058779.jpeg';
  const logoFallback = '/public/assets/aistudio/WhatsApp_Image_2026-11-05_at_11.03.53_PM_a9058779.jpeg';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = getOrCreateDeviceId();
      setDeviceId(id);
      // Check if this device already unlocked VIP
      const activeKey = localStorage.getItem('shadore_vip_active_key');
      if (activeKey && activeKey.includes('VIP')) {
        setVipUnlocked(true);
      }
    }
  }, []);

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleLaunchGame = (pkg: string) => {
    launchGamePackage(pkg);
  };

  return (
    <div className="min-h-screen bg-[#07040a] text-slate-100 flex flex-col font-sans selection:bg-[#9333EA]/40 selection:text-white relative">
      {/* 3D Particle Background (Three.js) */}
      <ThreeBackground />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0617]/90 backdrop-blur-md border-b border-[#2d154a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:h-16 flex items-center justify-between gap-2">
          {/* Logo & Title: SHADØRE XY Touch */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl overflow-hidden border-2 border-[#A855F7] shadow-lg shadow-[#9333EA]/40 bg-[#160a28] flex items-center justify-center">
              <img
                src={logoPath}
                alt="Logo SHADØRE XY Touch"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = logoFallback;
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-wider truncate uppercase">
                  SHADØRE XY Touch
                </h1>
                <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#9333EA]/30 text-[#C084FC] border border-[#A855F7]/40 shadow-sm">
                  Shizuku Service
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#9f8eb7] truncate">
                Direct Touch Engine &bull; Pointer Speed &bull; Free Fire &amp; MAX
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsGithubModalOpen(true)}
              className="text-[11px] text-white bg-[#1a0b2c] hover:bg-[#25103d] px-2.5 py-1.5 rounded-lg border border-[#3f1966] transition flex items-center gap-1"
              title="Publish ke GitHub & Install APK"
            >
              <Github className="w-3.5 h-3.5 text-[#C084FC]" />
              <span className="hidden sm:inline">GitHub /</span> APK
            </button>
            <button
              onClick={() => setIsScreenshotModalOpen(true)}
              className="text-[11px] text-[#a493bd] hover:text-white bg-[#1a0c2c] px-2.5 py-1.5 rounded-lg border border-[#3b1763] transition flex items-center gap-1"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#C084FC]" />
              <span className="hidden sm:inline">Gambar</span> Asli
            </button>
            <button
              onClick={() => setIsVipModalOpen(true)}
              className={`flex items-center gap-1 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 rounded-lg transition shadow-md ${
                vipUnlocked
                  ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40 shadow-[#fbbf24]/10'
                  : 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white hover:from-[#a855f7] hover:to-[#c084fc] shadow-[#9333EA]/30'
              }`}
            >
              {vipUnlocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{vipUnlocked ? 'VIP Active' : 'Akses VIP'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 w-full z-10">
        {/* Hero Banner: Featuring SHADØRE Logo Art at the Top */}
        <div className="relative overflow-hidden rounded-2xl border border-[#3a1861] bg-gradient-to-r from-[#170a2c] via-[#10061e] to-[#0a0314] p-5 shadow-2xl">
          {/* Subtle glow orb */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-[#9333EA]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
            {/* Logo Emblem on Hero */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-[#A855F7] shadow-xl shadow-[#9333EA]/50 bg-black/80 flex items-center justify-center p-1">
                <img
                  src={logoPath}
                  alt="SHADØRE Official Logo"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = logoFallback;
                  }}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#C084FC]" />
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C084FC]">
                    SHADØRE XY TOUCH &bull; FREEFIRE SENSI
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase">
                  MORE HEADSHOT &bull; MORE BOOYAH
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#a797be] flex-wrap">
                  <span className="flex items-center gap-1 text-[#C084FC]">
                    <Target className="w-3.5 h-3.5" /> Aim Lock
                  </span>
                  <span className="text-[#4c2175]">&bull;</span>
                  <span className="flex items-center gap-1 text-purple-300">
                    <Zap className="w-3.5 h-3.5" /> Smooth Touch
                  </span>
                  <span className="text-[#4c2175]">&bull;</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <Crown className="w-3.5 h-3.5" /> 1 Key = 1 Device
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Sensi & Shizuku Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto bg-[#0a0314]/80 border border-[#2d154a] p-3 rounded-xl">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Sensi XY Aktif</span>
                </div>
                <p className="text-xs font-semibold text-white mt-0.5">
                  Global: <span className="text-[#C084FC]">ON</span> &bull; Y: <span className="text-[#C084FC] font-mono">{config.sensiY.toFixed(2)}</span> &bull; X: <span className="text-[#C084FC] font-mono">{config.sensiX.toFixed(2)}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsVipModalOpen(true)}
                  className="flex-1 sm:flex-initial text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#200e36] text-[#C084FC] hover:bg-[#2b1447] border border-[#A855F7]/40 transition text-center"
                >
                  {vipUnlocked ? 'VIP Terverifikasi' : 'Input Key VIP'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Sensi Editor & Shizuku Engine Panel (CMD output removed as requested) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: Sensi Editor with Infinix / Tecno & sliders */}
          <SensiEditor
            config={config}
            onChange={setConfig}
            onReset={handleReset}
            onShowReference={() => setIsScreenshotModalOpen(true)}
            vipUnlocked={vipUnlocked}
            onToggleVip={() => setIsVipModalOpen(true)}
          />

          {/* Column 2: Shizuku Service Engine & Game Launcher (com.dts.freefireth & com.dts.freefiremax) */}
          <ShizukuEnginePanel
            config={config}
            onLaunchGame={handleLaunchGame}
          />
        </div>

        {/* Live Touch Simulator Canvas */}
        <TouchCanvasSimulator config={config} />

        {/* Educational Section: Apa itu XY, Perbedaan Resolusi, dan Mengapa Memilih Shadore */}
        <ShadoreKnowledgeGuide />

        {/* Bottom Mandatory Announcement / Anti-Crack Warning */}
        <AntiCrackWarning />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#25123d] bg-[#07030e]/95 backdrop-blur-md py-6 text-center text-xs text-[#82719a] z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            SHADØRE XY Touch &bull; Official Shizuku Engine for Free Fire &amp; Free Fire MAX.
          </p>
          <p className="flex items-center gap-1.5 text-[#C084FC]">
            <ShieldCheck className="w-4 h-4" />
            <span>1 Key = 1 Device System &bull; Non-Invasive OS Input Settings &bull; Anti Ban</span>
          </p>
        </div>
      </footer>

      {/* Modals */}
      <VipLicenseModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        onVipUnlocked={() => setVipUnlocked(true)}
        isAlreadyVip={vipUnlocked}
      />

      <ScreenshotModal
        isOpen={isScreenshotModalOpen}
        onClose={() => setIsScreenshotModalOpen(false)}
        onApplyOriginalValues={() => {
          setConfig((prev) => ({
            ...prev,
            sensiX: 2.06,
            sensiY: 2.08,
            globalEnabled: true,
          }));
        }}
      />

      <GithubPublishModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
      />
    </div>
  );
}
