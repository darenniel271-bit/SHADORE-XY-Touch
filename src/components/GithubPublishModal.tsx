import React, { useState } from 'react';
import { X, Github, Download, Check, Copy, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';

interface GithubPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubPublishModal: React.FC<GithubPublishModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const steps = [
    {
      title: '1. Inisialisasi Git & Upload ke GitHub',
      cmd: 'git init && git add . && git commit -m "feat: SHADØRE XY Touch Release v1.0" && git branch -M main && git remote add origin https://github.com/USERNAME/shadore-xy-touch.git && git push -u origin main',
      note: 'Ganti USERNAME dengan akun GitHub Anda.',
    },
    {
      title: '2. Build APK Android via PWA Builder / Capacitor',
      cmd: 'npm run build && npx @capacitor/cli init "SHADØRE XY Touch" "com.shadore.xytouch" --web-dir dist',
      note: 'Dapat langsung di-generate menjadi file APK debug/release siap instal di HP.',
    },
    {
      title: '3. Instal Langsung dari Browser (WebAPK / PWA)',
      cmd: '# Buka link URL di browser Chrome Android > Klik titik 3 di kanan atas > "Install App / Tambahkan ke Layar Utama"',
      note: 'Aplikasi akan otomatis terpasang dengan ikon SHADØRE di drawer HP Anda.',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12091f] border border-[#2d164a] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Tutup Modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#210f36] text-[#a494bf] hover:text-white flex items-center justify-center transition border border-[#3b195f]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-lg shadow-white/10">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Panduan Publish GitHub &amp; Instal APK</h3>
            <p className="text-xs text-[#9d8bb6]">Langkah resmi publikasi SHADØRE XY Touch ke GitHub Releases</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-[#0b0514] border border-[#28133e] rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{step.title}</span>
                <button
                  onClick={() => handleCopy(step.cmd, idx)}
                  className="flex items-center gap-1 text-[11px] text-[#C084FC] hover:underline"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === idx ? 'Tersalin' : 'Salin Perintah'}</span>
                </button>
              </div>
              <code className="block bg-[#05020a] p-2 rounded text-[11px] font-mono text-purple-200 select-all border border-[#210f35] break-all">
                {step.cmd}
              </code>
              <p className="text-[11px] text-[#86769c]">{step.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-[#25123d] flex items-center justify-between text-xs text-[#9d8cb5]">
          <span className="flex items-center gap-1 text-[#C084FC]">
            <ShieldCheck className="w-4 h-4" /> 1 Key = 1 Device Terproteksi
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#200e36] text-white hover:bg-[#2b1447] font-semibold border border-[#3e1966]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
