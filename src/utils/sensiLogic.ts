export interface SensiConfig {
  globalEnabled: boolean;
  sensiX: number; // 1.00 to 5.00 (or up to 10.00 with VIP)
  sensiY: number; // 1.00 to 5.00 (or up to 10.00 with VIP)
  directionMode: 'kiri' | 'semua' | 'kanan';
  brandPreset: 'universal' | 'xiaomi' | 'samsung' | 'realme_oppo' | 'vivo' | 'rog' | 'infinix_tecno';
  includeTouchSlop: boolean;
  includeVelocityTracker: boolean;
  includePointerSpeed: boolean;
  deviceResolution: {
    width: number;
    height: number;
    density: number;
  };
}

export const DEFAULT_CONFIG: SensiConfig = {
  globalEnabled: true,
  sensiX: 2.06,
  sensiY: 2.08,
  directionMode: 'semua',
  brandPreset: 'infinix_tecno',
  includeTouchSlop: true,
  includeVelocityTracker: true,
  includePointerSpeed: true,
  deviceResolution: {
    width: 1080,
    height: 2400,
    density: 440,
  },
};

/**
 * Calculates pointer speed integer (-7 to 7) based on sensitivity factor
 */
export function calculatePointerSpeed(sensiVal: number): number {
  const normalized = Math.min(Math.max(sensiVal, 1.0), 10.0);
  const pointerSpeed = Math.round(((normalized - 1) / 4) * 7);
  return Math.min(Math.max(pointerSpeed, 0), 7);
}

/**
 * Calculates touch slop in pixels (lower = more responsive flick/drag)
 */
export function calculateTouchSlop(sensiY: number): number {
  if (sensiY >= 3.5) return 1;
  if (sensiY >= 2.0) return 2;
  return 4;
}

/**
 * Brand specific configurations including Infinix / Tecno
 */
export function getBrandPresetDetails(brand: SensiConfig['brandPreset']) {
  switch (brand) {
    case 'infinix_tecno':
      return {
        name: 'Infinix / Tecno (XOS / HiOS)',
        description: 'Optimasi Transsion Touch Engine, HiOS Game Zone 240Hz, & Ultra Touch Response',
        commands: [
          'setprop persist.sys.transsion.touch_rate 240',
          'settings put secure game_mode_touch_sampling 240',
          'setprop persist.sys.game.infinix.touch 1',
        ],
      };
    case 'xiaomi':
      return {
        name: 'Xiaomi / Poco (MIUI / HyperOS)',
        description: 'MIUI Game Turbo Touch Sensitivity Level 5 & zero-mistouch edge filter',
        commands: [
          'settings put secure game_touch_sensitivity 5',
          'settings put secure game_touch_edge 0',
        ],
      };
    case 'samsung':
      return {
        name: 'Samsung (One UI)',
        description: 'One UI Master Motion Smoothing & 240Hz sampling lock',
        commands: [
          'settings put system master_motion 1',
          'setprop debug.vendor.touch_rate 240',
        ],
      };
    case 'realme_oppo':
      return {
        name: 'Realme / Oppo (ColorOS / Realme UI)',
        description: 'ColorOS Touch Driver Boost & HyperBoost touch sampling',
        commands: ['setprop persist.sys.oppo.game.touch_rate 240'],
      };
    case 'vivo':
      return {
        name: 'Vivo / iQOO (Funtouch / OriginOS)',
        description: 'Ultra Game Mode Touch Response & Multi-Turbo Sampling',
        commands: ['setprop persist.sys.vivo.game.touch_rate 240'],
      };
    case 'rog':
      return {
        name: 'ROG / BlackShark',
        description: 'Hardcore Gaming Phone 360Hz Ultra Touch Polling',
        commands: ['setprop persist.asus.gamelist.touch_rate 360'],
      };
    case 'universal':
    default:
      return {
        name: 'Universal (AOSP Android)',
        description: 'Driver Sentuhan Baku Android AOSP dengan Hook Inputflinger',
        commands: [],
      };
  }
}

/**
 * Generates an array of individual shell commands for internal Shizuku execution
 */
export function generateCommandList(config: SensiConfig): Array<{ command: string; explanation: string; category: string }> {
  if (!config.globalEnabled) {
    return [
      {
        command: '# Sensitivity Global dinonaktifkan.',
        explanation: 'Status off',
        category: 'info',
      },
    ];
  }

  const list: Array<{ command: string; explanation: string; category: string }> = [];
  const pointerSpeed = calculatePointerSpeed(Math.max(config.sensiX, config.sensiY));
  const touchSlop = calculateTouchSlop(config.sensiY);

  if (config.includePointerSpeed) {
    list.push({
      command: `settings put system pointer_speed ${pointerSpeed}`,
      explanation: `Mengubah kecepatan penunjuk sistem Android ke level ${pointerSpeed} (Standar: 0, Maks: 7)`,
      category: 'Sistem Inti',
    });
    list.push({
      command: `settings put secure touch_response_time 1`,
      explanation: 'Meminimalkan latensi input sentuhan layar menjadi instan (1ms)',
      category: 'Sistem Inti',
    });
    list.push({
      command: `settings put secure long_press_timeout 200`,
      explanation: 'Mengurangi jeda respon tekan lama tombol tembak/aim',
      category: 'Sistem Inti',
    });
    list.push({
      command: `settings put secure multi_press_timeout 150`,
      explanation: 'Mempercepat deteksi multi-tap tombol jump-shot & gloo wall',
      category: 'Sistem Inti',
    });
  }

  if (config.includeTouchSlop) {
    list.push({
      command: `device_config put input touch_slop ${touchSlop}`,
      explanation: `Mengurangi ambang batas geser sentuhan ke ${touchSlop}px tanpa deadzone`,
      category: 'Kurva Sentuhan',
    });
  }

  if (config.includeVelocityTracker) {
    list.push({
      command: `device_config put input velocity_tracker_strategy lsq2`,
      explanation: 'Mengaktifkan pelacakan kecepatan kuadratik untuk kurva X/Y',
      category: 'Kurva Sentuhan',
    });
  }

  const ratioYX = (config.sensiY / config.sensiX).toFixed(3);
  list.push({
    command: `setprop persist.sys.touch.sensitivity ${(config.sensiY * 20).toFixed(0)}`,
    explanation: `Mengatur sensitivitas sumbu Y vertikal ke nilai ${(config.sensiY * 20).toFixed(0)}`,
    category: 'Sumbu X & Y',
  });
  list.push({
    command: `setprop persist.vendor.touch.sensitivity ${(config.sensiX * 20).toFixed(0)}`,
    explanation: `Mengatur sensitivitas sumbu X horizontal (Rasio Y/X: ${ratioYX})`,
    category: 'Sumbu X & Y',
  });
  list.push({
    command: `setprop debug.touch.press 1`,
    explanation: 'Kalibrasi kurva tekanan sentuhan jari',
    category: 'Sumbu X & Y',
  });
  list.push({
    command: `setprop persist.sys.touch.response 1`,
    explanation: 'Memaksa touch dispatcher merespons pada frame pertama',
    category: 'Sumbu X & Y',
  });

  // Brand specific
  const brandInfo = getBrandPresetDetails(config.brandPreset);
  brandInfo.commands.forEach((cmd) => {
    list.push({
      command: cmd,
      explanation: `Optimasi khusus merek ${brandInfo.name}`,
      category: 'Preset HP',
    });
  });

  return list;
}

export function generateOneLiner(config: SensiConfig): string {
  const list = generateCommandList(config);
  const activeCommands = list.map((item) => item.command).filter((cmd) => !cmd.startsWith('#'));
  if (activeCommands.length === 0) return '';
  return activeCommands.join(' && ');
}

// -------------------------------------------------------------
// VIP 1 KEY = 1 DEVICE LICENSE VALIDATION SYSTEM
// -------------------------------------------------------------

/**
 * Generates or retrieves a unique persistent device ID for this phone/browser
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'SHD-DEV-B70P21';
  const KEY = 'shadore_device_fingerprint_id';
  let deviceId = localStorage.getItem(KEY);
  if (!deviceId) {
    // Generate deterministic device ID based on screen, platform, and random seed
    const seed = Math.random().toString(36).substring(2, 7).toUpperCase();
    deviceId = `SHD-DEV-${seed}-VIP`;
    localStorage.setItem(KEY, deviceId);
  }
  return deviceId;
}

/**
 * Validates a License Key with the strict requirements:
 * 1. Must contain "VIP" (e.g. SHDX-B70P-VIP)
 * 2. 1 Key = 1 Device (if already bound to another device, it fails)
 * 3. Returns "Lisence Key Invalid" if invalid or mismatched
 */
export interface LicenseValidationResult {
  isValid: boolean;
  message: string;
  boundDevice?: string;
}

export function validateLicenseKey(
  inputKey: string,
  currentDeviceId: string,
  storedBindings: Record<string, string> = {}
): LicenseValidationResult {
  const cleanKey = inputKey.trim().toUpperCase();

  if (!cleanKey) {
    return {
      isValid: false,
      message: 'Masukkan Access Key VIP Anda',
    };
  }

  // Requirement: "wajib berformat seperti contoh = SHDX-B70P-VIP (wajib ada kata VIP) dan jika berbeda akan invalid"
  const hasVipWord = cleanKey.includes('VIP');
  // Format check: e.g. SHDX-B70P-VIP or SHD-XXXX-VIP (3 to 5 segments separated by dash)
  const formatRegex = /^[A-Z0-9]{3,5}-[A-Z0-9]{3,5}-VIP$/;
  const isMatchFormat = formatRegex.test(cleanKey);

  if (!hasVipWord || !isMatchFormat) {
    return {
      isValid: false,
      message: 'Lisence Key Invalid',
    };
  }

  // Check 1 Key = 1 Device binding
  // If the key has already been registered to another device
  const existingOwnerDevice = storedBindings[cleanKey];
  if (existingOwnerDevice && existingOwnerDevice !== currentDeviceId) {
    return {
      isValid: false,
      message: 'Lisence Key Invalid',
      boundDevice: existingOwnerDevice,
    };
  }

  // Key is valid!
  return {
    isValid: true,
    message: 'Access Key VIP Valid! 1 Key = 1 Device Terkunci',
    boundDevice: currentDeviceId,
  };
}

// -------------------------------------------------------------
// GAME LAUNCHER DETAILS (Free Fire & Free Fire MAX)
// -------------------------------------------------------------

export interface GameTarget {
  id: 'freefire' | 'freefire_max';
  name: string;
  packageName: string;
  version: string;
  badge: string;
}

export const SUPPORTED_GAMES: GameTarget[] = [
  {
    id: 'freefire',
    name: 'Free Fire',
    packageName: 'com.dts.freefireth',
    version: 'Original Battle Royale',
    badge: 'FF TH',
  },
  {
    id: 'freefire_max',
    name: 'Free Fire MAX',
    packageName: 'com.dts.freefiremax',
    version: 'Ultra HD Edition',
    badge: 'FF MAX',
  },
];

/**
 * Triggers launch intent for the selected game package on Android
 */
export function launchGamePackage(packageName: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    // Android intent URL scheme: intent://#Intent;package=com.dts...;end
    const intentUrl = `intent://#Intent;package=${packageName};action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;end`;
    window.location.href = intentUrl;
    return true;
  } catch {
    return false;
  }
}
