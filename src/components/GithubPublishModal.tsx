import React, { useState } from 'react';
import {
  X,
  Github,
  Download,
  Check,
  Copy,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Key,
  FolderGit2,
  Terminal,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface GithubPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GithubPublishModal: React.FC<GithubPublishModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const repoUrl = 'https://github.com/darenniel271-bit/SHADORE-XY-Touch';
  const apkDownloadPath = '/download/SHADORE-XY-Touch-v1.0.apk';

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const gitPushCmd = `git remote set-url origin https://x-access-token:TOKEN_ANDA@github.com/darenniel271-bit/SHADORE-XY-Touch.git
git push -u origin main --force`;

  const releaseCmd = `curl -X POST -H "Authorization: Bearer TOKEN_ANDA" \\
  -H "Accept: application/vnd.github+json" \\
  https://api.github.com/repos/darenniel271-bit/SHADORE-XY-Touch/releases \\
  -d '{"tag_name":"v1.0.0","name":"SHADØRE XY Touch v1.0.0 Official Release","body":"Official Release APK"}'`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#10071c] border border-[#3b195f] rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Tutup Modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#210f36] text-[#a494bf] hover:text-white flex items-center justify-center transition border border-[#3b195f]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#9333EA] to-[#A855F7] text-white flex items-center justify-center shadow-lg shadow-[#9333EA]/30">
            <Smartphone className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-extrabold text-white">APK Siap &amp; Publikasi GitHub Releases</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                APK Built &amp; Signed
              </span>
            </div>
            <p className="text-xs text-[#9d8bb6]">
              Target Repo: <a href={repoUrl} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline inline-flex items-center gap-1 font-mono">{repoUrl} <ExternalLink className="w-3 h-3 inline" /></a>
            </p>
          </div>
        </div>

        {/* Section 1: Direct Download APK */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#1f0d3a] via-[#160a28] to-[#120722] border-2 border-[#A855F7]/50 shadow-xl shadow-[#9333EA]/20 mb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>File APK Resmi Siap Diinstal</span>
              </div>
              <p className="text-xs text-[#d1c4e9]">
                <strong className="text-white font-mono">SHADORE-XY-Touch-v1.0.apk</strong> &bull; Size: ~639 KB &bull; Signed (v1, v2, v3) &bull; Shizuku ADB Ready
              </p>
            </div>
            <a
              href={apkDownloadPath}
              download="SHADORE-XY-Touch-v1.0.apk"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#C084FC] hover:from-[#A855F7] hover:to-[#D8B4FE] text-white font-extrabold text-xs shadow-lg shadow-[#9333EA]/40 flex items-center justify-center gap-2 transition active:scale-95 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download APK (v1.0.0)</span>
            </a>
          </div>
        </div>

        {/* Section 2: GitHub Release Status & Token Permission Notice */}
        <div className="space-y-4">
          <div className="bg-[#1a0a1f] border border-amber-500/40 rounded-xl p-3.5 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-300">
                  Status Akses GitHub Token (Fine-Grained PAT):
                </h4>
                <p className="text-[11px] text-[#cfbdd9] leading-relaxed mt-1">
                  Token GitHub yang dimasukkan (<code className="text-amber-300 font-mono">github_pat_11CUFCOBY...</code>) terhubung ke akun <strong>darenniel271-bit</strong>, namun saat membuat rilis di GitHub API, server merespons:
                </p>
                <div className="mt-1.5 bg-[#0a030f] p-2 rounded border border-amber-500/30 text-[11px] font-mono text-rose-300">
                  403 Forbidden: &quot;Resource not accessible by personal access token&quot;<br />
                  <span className="text-[#a895b8] text-[10px]">Wajib memiliki permission: <span className="text-emerald-300">contents=write</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick 3-Step Fix */}
          <div className="bg-[#0b0514] border border-[#2d154a] rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#C084FC]" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Langkah Mengaktifkan Izin Unggah ke GitHub Releases (1 Menit):
              </h4>
            </div>

            <ol className="list-decimal list-inside space-y-2 text-xs text-[#cfc2e2]">
              <li className="leading-relaxed">
                Buka menu token di GitHub:{' '}
                <a
                  href="https://github.com/settings/tokens?type=beta"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#C084FC] underline hover:text-purple-300 inline-flex items-center gap-1 font-semibold"
                >
                  GitHub Fine-grained Tokens <ExternalLink className="w-3 h-3 inline" />
                </a>
              </li>
              <li className="leading-relaxed">
                Klik token <strong>SHADORE</strong> atau token yang Anda buat.
              </li>
              <li className="leading-relaxed">
                Pada bagian <strong className="text-white">Repository permissions</strong>, cari <strong className="text-[#C084FC]">Contents</strong> &rarr; ubah dari <em>Read-only</em> menjadi <strong className="text-emerald-400">Read and write</strong>.
              </li>
              <li className="leading-relaxed">
                Klik tombol hijau <strong className="text-white">Save changes</strong> di paling bawah.
              </li>
            </ol>
            <p className="text-[11px] text-[#9a86b5] italic">
              *Atau Anda juga bisa menggunakan <strong>Personal access tokens (classic)</strong> dengan mencentang scope <strong>repo</strong>.
            </p>
          </div>

          {/* Terminal Commands */}
          <div className="bg-[#0b0514] border border-[#2d154a] rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#C084FC]" />
                Perintah Push Git &amp; Rilis via Terminal
              </span>
              <button
                onClick={() => copyToClipboard(gitPushCmd, 'git')}
                className="flex items-center gap-1 text-[11px] text-[#C084FC] hover:underline"
              >
                {copiedKey === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'git' ? 'Tersalin' : 'Salin Perintah'}</span>
              </button>
            </div>
            <code className="block bg-[#05020a] p-2.5 rounded text-[11px] font-mono text-purple-200 select-all border border-[#210f35] whitespace-pre-wrap break-all">
              {gitPushCmd}
            </code>
          </div>

          {/* Automated GitHub Action CI/CD Included */}
          <div className="bg-[#0b0514] border border-[#2d154a] rounded-xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">GitHub Actions Workflow Sudah Tersedia</span>
            </div>
            <p className="text-[11px] text-[#a998c2]">
              File otomatisasi <code className="text-[#C084FC] font-mono">.github/workflows/build-apk.yml</code> sudah terkonfigurasi di dalam project. Begitu repo di-push, GitHub akan secara otomatis meng-compile APK dan mem-publishnya ke tab Releases repo Anda.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-[#25123d] flex items-center justify-between text-xs text-[#9d8cb5]">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" /> APK Siap Digunakan &bull; 1 Key 1 Device
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#200e36] text-white hover:bg-[#2b1447] font-semibold border border-[#3e1966] transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
