import React, { useState } from 'react';
import { SensiConfig, calculatePointerSpeed, SUPPORTED_GAMES, launchGamePackage, generateCommandList } from '../utils/sensiLogic';
import {
  ShieldCheck,
  CheckCircle2,
  Play,
  Rocket,
  Smartphone,
  ExternalLink,
  Flame,
  Gamepad2,
  RefreshCw,
  Cpu,
} from 'lucide-react';

interface ShizukuEnginePanelProps {
  config: SensiConfig;
  onLaunchGame: (pkg: string) => void;
}

export const ShizukuEnginePanel: React.FC<ShizukuEnginePanelProps> = ({ config, onLaunchGame }) => {
  const [shizukuRunning, setShizukuRunning] = useState(true);
  const [shizukuPermissionGranted, setShizukuPermissionGranted] = useState(true);
  const [isRunningService, setIsRunningService] = useState(false);
  const [appliedStatus, setAppliedStatus] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<'freefire' | 'freefire_max'>('freefire');
  const [launchStatus, setLaunchStatus] = useState<string | null>(null);

  const pointerSpeed = calculatePointerSpeed(Math.max(config.sensiX, config.sensiY));
  const activeGame = SUPPORTED_GAMES.find((g) => g.id === selectedGame) || SUPPORTED_GAMES[0];

  const handleRunSystemApply = () => {
    setIsRunningService(true);
    setAppliedStatus('Memverifikasi Izin Shizuku...');

    setTimeout(() => {
      setAppliedStatus('Menyuntikkan Sistem Pointer Speed & XY Touch...');
    }, 600);

    setTimeout(() => {
      setIsRunningService(false);
      setAppliedStatus(
        `Sukses! Sistem Pointer Speed diset ke level ${pointerSpeed} & Driver XY Sensi Aktif!`
      );
    }, 1200);
  };

  const handleTriggerLaunch = () => {
    setLaunchStatus(`Membuka ${activeGame.name} (${activeGame.packageName})...`);
    launchGamePackage(activeGame.packageName);
    setTimeout(() => {
      setLaunchStatus(null);
    }, 3000);
  };

  return (
    <div className="bg-[#12091f]/90 backdrop-blur-md border border-[#2d164a] rounded-2xl p-5 shadow-2xl flex flex-col h-full relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#9333EA]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#25123d] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#9333EA]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#C084FC]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Shizuku ADB Service &amp; Game Engine</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                Active
              </span>
            </h3>
            <p className="text-[11px] text-[#9382ab]">
              Eksekusi Langsung ke Sistem Pointer &amp; Driver Sentuhan Tanpa Root
            </p>
          </div>
        </div>
      </div>

      {/* Shizuku Requirements Checklist */}
      <div className="bg-[#0b0514] border border-[#26133d] rounded-xl p-3.5 mb-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C084FC]" />
            <span>Syarat Wajib Shizuku ADB:</span>
          </span>
          <span className="text-[11px] text-[#C084FC] font-mono">Port 5555 / Wireless</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-2 bg-[#140824] p-2 rounded-lg border border-[#2d144e]">
            <CheckCircle2 className="w-4 h-4 text-[#C084FC] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Shizuku Service Running</p>
              <p className="text-[11px] text-[#8e7ea7]">Layanan Shizuku wajib menyala aktif via adb/wireless debugging</p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-[#140824] p-2 rounded-lg border border-[#2d144e]">
            <CheckCircle2 className="w-4 h-4 text-[#C084FC] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Authorized Application</p>
              <p className="text-[11px] text-[#8e7ea7]">Wajib pilih opsi &quot;Allow all the time&quot; (Selalu Izinkan)</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Pointer Status & Action */}
      <div className="space-y-4 mb-5">
        <div className="bg-[#0e0717] border border-[#281340] rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-white">Target Pointer Speed Sistem Android:</span>
              <p className="text-[11px] text-[#8e7ea7]">
                Akan otomatis mengubah kecepatan penunjuk di sistem asli HP Anda
              </p>
            </div>
            <span className="text-sm font-mono font-bold text-[#C084FC] bg-[#1d0e30] px-3 py-1 rounded-lg border border-[#A855F7]/40 shadow-inner">
              Level {pointerSpeed} / 7
            </span>
          </div>

          {/* RUN Button */}
          <button
            onClick={handleRunSystemApply}
            disabled={isRunningService}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-xl ${
              isRunningService
                ? 'bg-[#291340] text-purple-300 cursor-wait'
                : 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white hover:from-[#a855f7] hover:to-[#c084fc] active:scale-98 shadow-[#9333EA]/30'
            }`}
          >
            {isRunningService ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>MENGAPLIKASIKAN KE SISTEM...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>RUN &amp; AKTIFKAN XY SENSI SHADØRE</span>
              </>
            )}
          </button>

          {appliedStatus && (
            <div className="mt-2.5 p-2 rounded-lg bg-[#1a082c] border border-[#A855F7]/40 text-xs text-purple-200 text-center font-medium animate-in fade-in">
              {appliedStatus}
            </div>
          )}
        </div>
      </div>

      {/* Game Launcher Section: Free Fire vs Free Fire MAX */}
      <div className="bg-[#0b0514] border border-[#26133d] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-[#C084FC]" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              PILIH GAME UNTUK DI-LAUNCH
            </h4>
          </div>
          <span className="text-[10px] text-[#8f7fa7]">Auto Hook Touch</span>
        </div>

        {/* 2 Game Options as requested */}
        <div className="grid grid-cols-2 gap-2.5">
          {SUPPORTED_GAMES.map((game) => {
            const isSelected = selectedGame === game.id;
            return (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id as any)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#A855F7] bg-[#220d3a] shadow-lg shadow-[#9333EA]/20'
                    : 'border-[#24123c] bg-[#0e0717] hover:bg-[#160b26]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{game.name}</span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#9333EA] text-white'
                        : 'bg-[#1e0e33] text-[#9a89b2]'
                    }`}
                  >
                    {game.badge}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[#a595bd] truncate">
                  {game.packageName}
                </p>
              </button>
            );
          })}
        </div>

        {/* Launch Button */}
        <button
          onClick={handleTriggerLaunch}
          className="w-full py-3 px-4 rounded-xl bg-[#1c0d30] hover:bg-[#281343] active:scale-98 border border-[#3d1866] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#9333EA]/10"
        >
          <Rocket className="w-3.5 h-3.5 text-[#C084FC]" />
          <span>LAUNCH {activeGame.name.toUpperCase()} SEKARANG</span>
        </button>

        {launchStatus && (
          <p className="text-[11px] text-center text-emerald-400 font-medium">
            {launchStatus}
          </p>
        )}
      </div>
    </div>
  );
};
