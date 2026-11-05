import React from 'react';
import { HelpCircle, Sparkles, CheckCircle2, ShieldCheck, Crosshair, Monitor, Zap } from 'lucide-react';

export const ShadoreKnowledgeGuide: React.FC = () => {
  return (
    <div className="bg-[#12091f]/90 backdrop-blur-md border border-[#2d164a] rounded-2xl p-6 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Title */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[#25123d]">
        <HelpCircle className="w-5 h-5 text-[#C084FC]" />
        <div>
          <h3 className="text-base font-bold text-white">
            Pusat Pengetahuan &amp; Edukasi SHADØRE XY Touch
          </h3>
          <p className="text-xs text-[#9d8bb6]">
            Panduan lengkap mengenai mekanika sumbu X-Y, resolusi layar, dan keunggulan teknologi SHADØRE
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Topic 1: Apa itu XY Sensitivity? */}
        <div className="bg-[#0c0517] border border-[#28133e] p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C084FC]">
              <Crosshair className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Apa itu XY Sensitivity?</h4>
            </div>
            <p className="text-xs text-[#9f8eb7] leading-relaxed">
              <strong>Sumbu X (Horizontal)</strong> mengontrol kecepatan putaran kamera ke kiri dan ke kanan untuk kelincahan *movement* rusher dan cek 360&deg; sudut pandang.
            </p>
            <p className="text-xs text-[#9f8eb7] leading-relaxed">
              <strong>Sumbu Y (Vertikal)</strong> mengatur tarikan tombol tembak ke atas (*drag shot*). Di Free Fire, sumbu Y yang tepat membuat tembakan langsung *lock headshot* dengan kurva sentuhan (*touch curve*) yang presisi tanpa recoil berlebih.
            </p>
          </div>
          <div className="p-2 rounded-lg bg-[#160829] border border-[#301352] text-[11px] text-purple-200">
            &bull; Rasio Y/X ideal (2.08 / 2.06) menstabilkan tarikan tombol tembak.
          </div>
        </div>

        {/* Topic 2: Perbedaan dengan Resolusi Layar */}
        <div className="bg-[#0c0517] border border-[#28133e] p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C084FC]">
              <Monitor className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Perbedaan dengan Resolusi Layar?</h4>
            </div>
            <p className="text-xs text-[#9f8eb7] leading-relaxed">
              <strong>Resolusi Layar (wm size / DPI)</strong> merombak seluruh kerapatan piksel tampilan sistem HP, yang sering menyebabkan tampilan aplikasi lain (seperti WhatsApp &amp; Instagram) menjadi gepeng, keyboard mengecil, dan GPU HP cepat panas.
            </p>
            <p className="text-xs text-[#9f8eb7] leading-relaxed">
              <strong>XY Sensi SHADØRE</strong> hanya menargetkan *driver touch inputflinger* dan kecepatan penunjuk sistem. Tampilan layar Anda tetap normal, tajam, dan 100% aman tanpa merusak UI handphone.
            </p>
          </div>
          <div className="p-2 rounded-lg bg-[#160829] border border-[#301352] text-[11px] text-purple-200">
            &bull; Layar tetap jernih asli pabrik, sentuhan menjadi super licin &amp; responsif.
          </div>
        </div>

        {/* Topic 3: Mengapa Harus Memilih SHADØRE? */}
        <div className="bg-[#0c0517] border border-[#28133e] p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#C084FC]">
              <Zap className="w-4 h-4" />
              <h4 className="text-sm font-bold text-white">Mengapa Harus SHADØRE?</h4>
            </div>
            <ul className="text-xs text-[#9f8eb7] space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-white">Sistem 1 Key = 1 Device:</strong> Terlindungi dari penipuan reseller liar dan pembajakan.
              </li>
              <li>
                <strong className="text-white">Integrasi Shizuku Nyata:</strong> Tidak perlu copy paste CMD rumit, cukup tekan tombol RUN.
              </li>
              <li>
                <strong className="text-white">Preset Merek Lengkap:</strong> Termasuk Infinix / Tecno, Xiaomi, Samsung, Oppo/Realme, ROG.
              </li>
              <li>
                <strong className="text-white">100% Anti-Banned:</strong> Bebas modifikasi file game berbahaya, murni optimasi OS.
              </li>
            </ul>
          </div>
          <div className="p-2 rounded-lg bg-[#160829] border border-[#301352] text-[11px] text-purple-200">
            &bull; Mendukung Free Fire Biasa &amp; Free Fire MAX sekaligus.
          </div>
        </div>
      </div>
    </div>
  );
};
