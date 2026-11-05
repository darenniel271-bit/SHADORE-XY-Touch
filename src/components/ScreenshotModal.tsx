import React from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOriginalValues: () => void;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  isOpen,
  onClose,
  onApplyOriginalValues,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12091f] border border-[#2d164a] rounded-2xl max-w-4xl w-full p-5 max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#25123d] mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Referensi Screenshot Asli &amp; Logo SHADØRE</span>
              <span className="text-[10px] bg-[#9333EA]/20 text-[#C084FC] border border-[#A855F7]/40 px-2 py-0.5 rounded uppercase">
                Aset Terlampir
              </span>
            </h3>
            <p className="text-xs text-[#9d8cb5]">
              Dibandingkan langsung dengan nilai yang diekstrak ke dalam kode CMD
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup Modal"
            className="w-8 h-8 rounded-lg bg-[#210f36] text-[#a494bf] hover:text-white flex items-center justify-center transition border border-[#3b195f]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Image Grid including new Logo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Logo Card */}
          <div className="bg-[#0b0514] border border-[#26133d] rounded-xl p-3 flex flex-col items-center">
            <span className="text-xs font-semibold text-[#C084FC] mb-2 self-start flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Logo SHADØRE FF Sensi</span>
            </span>
            <div className="rounded-lg overflow-hidden border border-[#3c1963] max-h-64 flex items-center justify-center bg-black/60 p-1">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-05_at_11.03.53_PM_a9058779.jpeg"
                alt="Logo SHADØRE Free Fire"
                className="max-h-60 w-auto object-contain rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/public/assets/aistudio/WhatsApp_Image_2026-11-05_at_11.03.53_PM_a9058779.jpeg';
                }}
              />
            </div>
            <p className="text-[11px] text-[#9382ab] mt-2 text-center">
              Logo resmi SHADØRE dengan tema ungu hitam esports.
            </p>
          </div>

          {/* Screenshot 1 */}
          <div className="bg-[#0b0514] border border-[#26133d] rounded-xl p-3 flex flex-col items-center">
            <span className="text-xs font-semibold text-[#C084FC] mb-2 self-start flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Gambar 1: Sensitivity Global</span>
            </span>
            <div className="rounded-lg overflow-hidden border border-[#3c1963] max-h-64 flex items-center justify-center bg-black/60 p-1">
              <img
                src="/assets/aistudio/xy_1_535a21b4.jpeg"
                alt="Pengaturan Sensi 1 Global"
                className="max-h-60 w-auto object-contain rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/public/assets/aistudio/xy_1_535a21b4.jpeg';
                }}
              />
            </div>
            <p className="text-[11px] text-[#9382ab] mt-2 text-center">
              Menampilkan toggle &apos;Sensitivity Global&apos; aktif &amp; teks curve sentuhan.
            </p>
          </div>

          {/* Screenshot 2 */}
          <div className="bg-[#0b0514] border border-[#26133d] rounded-xl p-3 flex flex-col items-center">
            <span className="text-xs font-semibold text-[#C084FC] mb-2 self-start flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Gambar 2: Sumbu Y &amp; X Slider</span>
            </span>
            <div className="rounded-lg overflow-hidden border border-[#3c1963] max-h-64 flex items-center justify-center bg-black/60 p-1">
              <img
                src="/assets/aistudio/xy_2_a0a400ca.jpeg"
                alt="Pengaturan Sensi 2 XY Slider"
                className="max-h-60 w-auto object-contain rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/public/assets/aistudio/xy_2_a0a400ca.jpeg';
                }}
              />
            </div>
            <p className="text-[11px] text-[#9382ab] mt-2 text-center">
              Slider: Sensitivity Y: 2.08 &amp; Sensitivity X: 2.06.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#25123d]">
          <span className="text-xs text-[#9d8bb5]">
            Ekstraksi nilai: <strong>X = 2.06</strong>, <strong>Y = 2.08</strong>, <strong>Global = ON</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#1e0f33] text-[#9d8cb5] hover:text-white text-xs font-semibold border border-[#3b195f]"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onApplyOriginalValues();
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white text-xs font-bold hover:from-[#a855f7] hover:to-[#c084fc] transition shadow-lg shadow-[#9333EA]/30"
            >
              <span>Terapkan Nilai Screenshot (2.06 &amp; 2.08)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
