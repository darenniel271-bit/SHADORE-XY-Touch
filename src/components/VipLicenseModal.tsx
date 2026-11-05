import React, { useState, useEffect } from 'react';
import { getOrCreateDeviceId, validateLicenseKey } from '../utils/sensiLogic';
import { X, Lock, Unlock, ShieldAlert, Key, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';

interface VipLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVipUnlocked: () => void;
  isAlreadyVip: boolean;
}

export const VipLicenseModal: React.FC<VipLicenseModalProps> = ({
  isOpen,
  onClose,
  onVipUnlocked,
  isAlreadyVip,
}) => {
  const [deviceId, setDeviceId] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = getOrCreateDeviceId();
      setDeviceId(id);
    }
  }, []);

  if (!isOpen) return null;

  const handleVerifyKey = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Get stored bindings from localStorage
    let storedBindings: Record<string, string> = {};
    try {
      const raw = localStorage.getItem('shadore_vip_key_bindings');
      if (raw) storedBindings = JSON.parse(raw);
    } catch {}

    const result = validateLicenseKey(accessKey, deviceId, storedBindings);

    if (!result.isValid) {
      // Must display "Lisence Key Invalid" below the access key field
      setErrorMessage(result.message);
      return;
    }

    // Success: Bind key to current device
    storedBindings[accessKey.trim().toUpperCase()] = deviceId;
    try {
      localStorage.setItem('shadore_vip_key_bindings', JSON.stringify(storedBindings));
      localStorage.setItem('shadore_vip_active_key', accessKey.trim().toUpperCase());
    } catch {}

    setSuccessMessage('Lisensi VIP Berhasil Diaktivasi! Mode 1 Key = 1 Device Terkunci.');
    setTimeout(() => {
      onVipUnlocked();
      onClose();
    }, 1200);
  };

  const handleUseDemoKey = () => {
    setAccessKey('SHDX-B70P-VIP');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12091f] border border-[#2d164a] rounded-2xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#9333EA]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup Modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#210f36] text-[#a494bf] hover:text-white flex items-center justify-center transition border border-[#3b195f]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#A855F7] flex items-center justify-center text-white shadow-lg shadow-[#9333EA]/30">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Verifikasi Access Key VIP</h3>
            <p className="text-[11px] text-[#9a89b2]">Sistem Keamanan 1 Key = 1 Device (Anti-Scam)</p>
          </div>
        </div>

        {/* Device ID Card */}
        <div className="bg-[#0b0514] border border-[#26133d] rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[#8e7ea7] flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-[#C084FC]" />
              <span>Device Fingerprint ID Anda:</span>
            </span>
            <span className="text-[10px] bg-[#9333EA]/20 text-[#C084FC] px-1.5 py-0.5 rounded font-mono">
              Hardware Bound
            </span>
          </div>
          <p className="font-mono text-xs font-bold text-white select-all bg-[#05020a] p-2 rounded border border-[#200e33]">
            {deviceId || 'SHD-DEV-B70P-VIP'}
          </p>
          <p className="text-[10px] text-[#816f99] mt-1.5">
            Key hanya dapat diaktivasi pada satu device ini. Jika dicoba di perangkat lain, lisensi otomatis diblokir.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerifyKey} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="vip-key-input" className="text-xs font-semibold text-white">
                Access Key VIP (Wajib format: SHDX-B70P-VIP):
              </label>
              <button
                type="button"
                onClick={handleUseDemoKey}
                className="text-[10px] text-[#C084FC] hover:underline"
              >
                Gunakan Contoh Key
              </button>
            </div>
            <input
              id="vip-key-input"
              type="text"
              placeholder="Contoh: SHDX-B70P-VIP"
              value={accessKey}
              onChange={(e) => {
                setAccessKey(e.target.value);
                setErrorMessage(null);
              }}
              className="w-full bg-[#0e0717] border border-[#281340] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-[#68577d] font-mono focus:outline-none focus:ring-2 focus:ring-[#A855F7] uppercase"
            />

            {/* Error Message directly below input as requested: "Lisence Key Invalid" */}
            {errorMessage && (
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-semibold mt-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mt-2 animate-in fade-in">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white hover:from-[#a855f7] hover:to-[#c084fc] active:scale-98 transition shadow-lg shadow-[#9333EA]/30 text-center"
            >
              AKTIVASI LISENSI VIP SEKARANG
            </button>
          </div>
        </form>

        {/* Owner Safety Notice */}
        <div className="mt-4 pt-3 border-t border-[#25123d] text-[11px] text-[#8d7ca5] flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Key resmi hanya didapatkan dari owner SHADØRE. Dilarang membeli dari perantara atau reseller tidak resmi.
          </span>
        </div>
      </div>
    </div>
  );
};
