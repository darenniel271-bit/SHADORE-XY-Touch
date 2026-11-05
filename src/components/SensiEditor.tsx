import React from 'react';
import { SensiConfig } from '../utils/sensiLogic';
import { Sparkles, Check, Lock, Unlock, Image as ImageIcon } from 'lucide-react';

interface SensiEditorProps {
  config: SensiConfig;
  onChange: (newConfig: SensiConfig) => void;
  onReset: () => void;
  onShowReference: () => void;
  vipUnlocked: boolean;
  onToggleVip: () => void;
}

export const SensiEditor: React.FC<SensiEditorProps> = ({
  config,
  onChange,
  onReset,
  onShowReference,
  vipUnlocked,
  onToggleVip,
}) => {
  const maxLimit = vipUnlocked ? 10.0 : 5.0;

  const updateField = <K extends keyof SensiConfig>(field: K, value: SensiConfig[K]) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const adjustValue = (field: 'sensiX' | 'sensiY', delta: number) => {
    const current = config[field];
    const updated = Math.min(Math.max(Number((current + delta).toFixed(2)), 1.0), maxLimit);
    updateField(field, updated);
  };

  return (
    <div className="bg-[#12091f]/90 backdrop-blur-md border border-[#2d164a] rounded-2xl p-5 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#9333EA]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header matching screenshot */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-wide">Pengaturan Sensi1</h2>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#A855F7]/20 text-[#C084FC] border border-[#A855F7]/40">
              Modul XY
            </span>
          </div>
          <p className="text-xs text-[#a798be] mt-1 leading-relaxed max-w-md">
            Mengatur sensitivity x y akan mengubah sentuhan menjadi curve atau lebih jauh dari titik coordinator sentuhan.
          </p>
        </div>
        <button
          onClick={onShowReference}
          aria-label="Lihat Gambar Asli"
          className="flex items-center gap-1.5 text-xs text-[#C084FC] hover:text-white bg-[#1e0f33] hover:bg-[#2b1547] px-3 py-1.5 rounded-lg border border-[#A855F7]/40 transition"
          title="Bandingkan dengan screenshot upload"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#A855F7]" />
          <span>Gambar Asli</span>
        </button>
      </div>

      {/* Sensitivity Global Toggle */}
      <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#0b0514] border border-[#26133d] mb-5">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#C084FC]" />
          <div>
            <span className="text-sm font-semibold text-white">Sensitivity Global</span>
            <p className="text-[11px] text-[#8e7aab]">
              {config.globalEnabled ? 'Aktif - Hook touch dispatcher & pointer speed' : 'Nonaktif - Standar Android'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          role="switch"
          aria-checked={config.globalEnabled}
          aria-label="Toggle Sensitivity Global"
          onClick={() => updateField('globalEnabled', !config.globalEnabled)}
          className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#A855F7] ${
            config.globalEnabled ? 'bg-[#9333EA]' : 'bg-[#29173f]'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out mt-1 ml-1 ${
              config.globalEnabled ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Direction Segment Selector: [Kiri] [Semua] [Kanan] */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-[#090412] border border-[#25123d] rounded-xl mb-6">
        {(['kiri', 'semua', 'kanan'] as const).map((mode) => {
          const isActive = config.directionMode === mode;
          const label = mode === 'kiri' ? 'Kiri' : mode === 'semua' ? 'Semua' : 'Kanan';
          return (
            <button
              key={mode}
              onClick={() => updateField('directionMode', mode)}
              className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all text-center capitalize ${
                isActive
                  ? 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white shadow-lg shadow-[#9333EA]/30 font-bold'
                  : 'text-[#9b8bb5] hover:text-white hover:bg-[#190c2b]'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Sensitivity Y Slider and Stepper */}
      <div className="space-y-5 mb-6">
        <div className="bg-[#0e0717] p-4 rounded-xl border border-[#281340]">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="sensi-y-slider" className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span>Sensitivity Y:</span>
              <span className="text-[11px] text-[#9383ab] font-normal">(Vertikal / Drag Headshot)</span>
            </label>
            <span className="text-base font-mono font-bold text-[#C084FC] bg-[#1d0e30] px-2.5 py-0.5 rounded border border-[#A855F7]/40 shadow-inner">
              {config.sensiY.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => adjustValue('sensiY', -0.02)}
              aria-label="Kurangi Sensitivitas Y"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#210f36] text-[#C084FC] hover:bg-[#2d154a] active:scale-95 border border-[#3c1b61] transition font-bold text-lg"
            >
              -
            </button>
            <input
              id="sensi-y-slider"
              type="range"
              min="1.00"
              max={maxLimit}
              step="0.01"
              value={config.sensiY}
              onChange={(e) => updateField('sensiY', parseFloat(e.target.value))}
              className="flex-1 h-2 bg-[#25123d] rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
            />
            <button
              onClick={() => adjustValue('sensiY', 0.02)}
              aria-label="Tambah Sensitivitas Y"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#210f36] text-[#C084FC] hover:bg-[#2d154a] active:scale-95 border border-[#3c1b61] transition font-bold text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Sensitivity X Slider and Stepper */}
        <div className="bg-[#0e0717] p-4 rounded-xl border border-[#281340]">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="sensi-x-slider" className="text-sm font-semibold text-white flex items-center gap-1.5">
              <span>Sensitivity X:</span>
              <span className="text-[11px] text-[#9383ab] font-normal">(Horizontal / Geser Layar)</span>
            </label>
            <span className="text-base font-mono font-bold text-[#C084FC] bg-[#1d0e30] px-2.5 py-0.5 rounded border border-[#A855F7]/40 shadow-inner">
              {config.sensiX.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => adjustValue('sensiX', -0.02)}
              aria-label="Kurangi Sensitivitas X"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#210f36] text-[#C084FC] hover:bg-[#2d154a] active:scale-95 border border-[#3c1b61] transition font-bold text-lg"
            >
              -
            </button>
            <input
              id="sensi-x-slider"
              type="range"
              min="1.00"
              max={maxLimit}
              step="0.01"
              value={config.sensiX}
              onChange={(e) => updateField('sensiX', parseFloat(e.target.value))}
              className="flex-1 h-2 bg-[#25123d] rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
            />
            <button
              onClick={() => adjustValue('sensiX', 0.02)}
              aria-label="Tambah Sensitivitas X"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#210f36] text-[#C084FC] hover:bg-[#2d154a] active:scale-95 border border-[#3c1b61] transition font-bold text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* VIP Unlock Note as seen in the screenshot */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#090412] border border-[#24113b] text-xs mb-6">
        <p className="text-[#a493be]">
          Jika ingin nilai lebih tinggi silahkan upgrade VIP ( min 1.00 - max {vipUnlocked ? '10.00' : '5.00'} )
        </p>
        <button
          onClick={onToggleVip}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
            vipUnlocked
              ? 'bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/40'
              : 'bg-[#210f36] text-[#C084FC] hover:bg-[#2c1448] border border-[#A855F7]/30'
          }`}
        >
          {vipUnlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
          <span>{vipUnlocked ? 'VIP Aktif (10.0)' : 'Buka VIP'}</span>
        </button>
      </div>

      {/* Brand Specific Preset Dropdown */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-[#a595bd] uppercase tracking-wider mb-2">
          Preset Merek Perangkat (Driver Touch)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'infinix_tecno', label: 'Infinix / Tecno (XOS)' },
            { id: 'xiaomi', label: 'Xiaomi / Poco' },
            { id: 'samsung', label: 'Samsung OneUI' },
            { id: 'realme_oppo', label: 'Realme / Oppo' },
            { id: 'vivo', label: 'Vivo / iQOO' },
            { id: 'rog', label: 'ROG / BlackShark' },
            { id: 'universal', label: 'Universal Android' },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => updateField('brandPreset', preset.id as any)}
              className={`p-2 text-xs rounded-lg border text-left transition ${
                config.brandPreset === preset.id
                  ? 'border-[#A855F7] bg-[#9333EA]/20 text-white font-medium shadow-md shadow-[#9333EA]/20'
                  : 'border-[#26133d] bg-[#0d0717] text-[#8e7da8] hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Action buttons matching BATAL and SIMPAN */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#25123d]">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 rounded-xl bg-[#1a0c2b] text-[#9b8bb5] hover:text-white hover:bg-[#24113b] font-semibold text-sm transition text-center"
        >
          BATAL / DEFAULT
        </button>
        <button
          onClick={() => {
            const btn = document.getElementById('save-indicator');
            if (btn) {
              btn.innerText = 'TERSIMPAN!';
              setTimeout(() => {
                btn.innerText = 'SIMPAN & GENERATE';
              }, 1500);
            }
          }}
          id="save-indicator"
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white font-bold text-sm hover:from-[#a855f7] hover:to-[#c084fc] active:scale-98 transition shadow-lg shadow-[#9333EA]/30 text-center"
        >
          SIMPAN & GENERATE
        </button>
      </div>
    </div>
  );
};
