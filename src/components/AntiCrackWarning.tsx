import React from 'react';
import { AlertOctagon, ShieldAlert, Lock, Skull } from 'lucide-react';

export const AntiCrackWarning: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-rose-600/70 bg-gradient-to-r from-[#21060f] via-[#16030a] to-[#21060f] p-5 shadow-2xl">
      {/* Background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 text-center sm:text-left">
        <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0 shadow-lg shadow-rose-600/20">
          <AlertOctagon className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-rose-600 text-white shadow-sm">
              PERINGATAN RESMI OWNER &bull; ANTI-CRACK SECURITY
            </span>
          </div>

          <p className="text-sm sm:text-base font-extrabold text-white tracking-wide uppercase leading-snug">
            &quot;Aplikasi ini tidak boleh dijual kembali, karena aplikasi ini menggunakan sistem 1 Key = 1 Device, dan jika tetap mengcrack aplikasi Shadore XY Touch akan kenon all pengcrack!&quot;
          </p>

          <p className="text-xs text-rose-300/80">
            Sistem penguncian terdaftar di server database device hardware. Upaya pembongkaran kode, decompile APK, atau cracking lisensi akan langsung memicu auto-blacklist device dan ban permanen.
          </p>
        </div>
      </div>
    </div>
  );
};
