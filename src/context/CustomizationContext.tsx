import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
<<<<<<< HEAD
import { CustomizationSettings, GlassPreset, ThemeMode, MotionPreset, UIFont } from '../types';
=======

export type ThemeMode = 'original' | 'dark' | 'light';
export type GlassPreset = 'low' | 'medium' | 'high' | 'ultra' | 'custom';
export type MotionMode = 'low' | 'medium' | 'high' | 'ultra';
export type UIFont = 'inter' | 'system' | 'mono';

export interface CustomizationSettings {
  theme: ThemeMode;
  glassPreset: GlassPreset;
  glassBlur: number;
  glassOpacity: number;
  glassThickness: number;
  motion: MotionMode;
  uiFont: UIFont;
  uiFontSize: number;
  uiLineHeight: number;
  editorFontSize: number;
  editorLineHeight: number;
}
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0

export const GLASS_PRESETS: Record<Exclude<GlassPreset, 'custom'>, { glassBlur: number; glassOpacity: number; glassThickness: number }> = {
  low: { glassBlur: 0, glassOpacity: 70, glassThickness: 0.5 },
  medium: { glassBlur: 8, glassOpacity: 45, glassThickness: 1 },
  high: { glassBlur: 18, glassOpacity: 32, glassThickness: 1.5 },
  ultra: { glassBlur: 28, glassOpacity: 22, glassThickness: 2.5 },
};

export const UI_FONTS: Record<UIFont, string> = {
  inter: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ui-sans-serif, system-ui, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", "Consolas", ui-monospace, monospace',
};

<<<<<<< HEAD
export const MOTION_SCALES: Record<MotionPreset, number> = {
=======
export const MOTION_DESCRIPTIONS: Record<MotionMode, string> = {
  low: 'Animations off — maximum performance and battery saving.',
  medium: 'Standard transitions for layout changes and card hovers.',
  high: 'Fluid panel resizing, hover scaling and button press depth.',
  ultra: 'Spring easing, micro-pulse glow rings and GPU-accelerated transitions.',
};

const MOTION_SCALES: Record<MotionMode, number> = {
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
  low: 0,
  medium: 0.7,
  high: 1,
  ultra: 1.25,
};

<<<<<<< HEAD
export const DEFAULT_SETTINGS: CustomizationSettings = {
=======
const DEFAULT_SETTINGS: CustomizationSettings = {
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
  theme: 'original',
  glassPreset: 'high',
  ...GLASS_PRESETS.high,
  motion: 'high',
  uiFont: 'inter',
  uiFontSize: 15,
  uiLineHeight: 1.55,
  editorFontSize: 14,
  editorLineHeight: 1.8,
<<<<<<< HEAD
  liquidGlassEnabled: false,
  liquidDensity: 20,
  liquidTransparency: 55,
  liquidClearness: 55,
  liquidGel: 50,
  liquidBounce: 55,
=======
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
};

const STORAGE_KEY = 'glass-notes:customization:v1';

<<<<<<< HEAD
export function calculateBounceSpring(bounce: number) {
  const t = Math.min(100, Math.max(0, bounce)) / 100;
  return {
    stiffness: 100 + t * 400,
    damping: 40 - t * 30,
  };
}

interface CustomizationContextType {
  settings: CustomizationSettings;
  update: (partial: Partial<CustomizationSettings>) => void;
  applyGlassPreset: (preset: Exclude<GlassPreset, 'custom'>) => void;
  reset: () => void;
}

const CustomizationContext = createContext<CustomizationContextType | null>(null);

=======
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
function getInitialSettings(): CustomizationSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

<<<<<<< HEAD
export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CustomizationSettings>(getInitialSettings);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (err) {
        console.error('Failed to save settings to localStorage', err);
      }
    }
  }, [settings, hydrated]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--glass-blur', `${settings.glassBlur}px`);
    root.style.setProperty('--glass-alpha', `${settings.glassOpacity / 100}`);
    root.style.setProperty('--glass-border-w', `${settings.glassThickness}px`);
    root.style.setProperty('--glass-depth', `${settings.glassThickness}`);
    root.style.setProperty('--motion-scale', `${MOTION_SCALES[settings.motion]}`);
    root.style.setProperty('--ui-font', UI_FONTS[settings.uiFont]);
    root.style.setProperty('--ui-font-size', `${settings.uiFontSize}px`);
    root.style.setProperty('--ui-line-height', `${settings.uiLineHeight}`);
    root.style.setProperty('--editor-font-size', `${settings.editorFontSize}px`);
    root.style.setProperty('--editor-line-height', `${settings.editorLineHeight}`);
    root.style.setProperty('--liquid-density', `${settings.liquidDensity}px`);
    root.style.setProperty('--liquid-transparency', `${settings.liquidTransparency / 100}`);
    root.style.setProperty('--liquid-clearness', `${settings.liquidClearness}`);
    root.style.setProperty('--liquid-gel', `${settings.liquidGel}`);
    root.style.setProperty('--liquid-bounce', `${settings.liquidBounce}`);

    root.dataset.theme = settings.theme;
    root.dataset.motion = settings.motion;
    root.dataset.liquidGlass = settings.liquidGlassEnabled ? 'on' : 'off';
  }, [settings]);

  const update = useCallback((partial: Partial<CustomizationSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      if (
        ('glassBlur' in partial || 'glassOpacity' in partial || 'glassThickness' in partial) &&
        !('glassPreset' in partial)
=======
function computeCssVariables(s: CustomizationSettings): Record<string, string> {
  return {
    '--glass-blur': `${s.glassBlur}px`,
    '--glass-alpha': `${s.glassOpacity / 100}`,
    '--glass-border-w': `${s.glassThickness}px`,
    '--glass-depth': `${s.glassThickness}`,
    '--motion-scale': `${MOTION_SCALES[s.motion] ?? 1}`,
    '--ui-font': UI_FONTS[s.uiFont] ?? UI_FONTS.inter,
    '--ui-font-size': `${s.uiFontSize}px`,
    '--ui-line-height': `${s.uiLineHeight}`,
    '--editor-font-size': `${s.editorFontSize}px`,
    '--editor-line-height': `${s.editorLineHeight}`,
  };
}

interface CustomizationContextValue {
  settings: CustomizationSettings;
  update: (updates: Partial<CustomizationSettings>) => void;
  applyGlassPreset: (preset: Exclude<GlassPreset, 'custom'>) => void;
  reset: () => void;
}

const CustomizationContext = createContext<CustomizationContextValue | null>(null);

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CustomizationSettings>(DEFAULT_SETTINGS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSettings(getInitialSettings());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota errors
    }
  }, [settings, mounted]);

  useEffect(() => {
    const root = document.documentElement;
    const vars = computeCssVariables(settings);
    for (const [key, val] of Object.entries(vars)) {
      root.style.setProperty(key, val);
    }
    root.dataset.theme = settings.theme;
    root.dataset.motion = settings.motion;
  }, [settings]);

  const update = useCallback((updates: Partial<CustomizationSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      // If user adjusted blur, opacity, or thickness manually without specifying glassPreset, mark custom
      if (
        ('glassBlur' in updates || 'glassOpacity' in updates || 'glassThickness' in updates) &&
        !('glassPreset' in updates)
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
      ) {
        next.glassPreset = 'custom';
      }
      return next;
    });
  }, []);

  const applyGlassPreset = useCallback((preset: Exclude<GlassPreset, 'custom'>) => {
    setSettings((prev) => ({
      ...prev,
      glassPreset: preset,
      ...GLASS_PRESETS[preset],
    }));
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const value = useMemo(
    () => ({
      settings,
      update,
      applyGlassPreset,
      reset,
    }),
    [settings, update, applyGlassPreset, reset]
  );

<<<<<<< HEAD
  const { liquidGlassEnabled, liquidDensity, liquidClearness } = settings;
  const scale = 3 + (liquidClearness / 100) * 14;
  const baseFreq = 0.006 + (liquidDensity / 40) * 0.05;
  const stdDev = liquidDensity / 8;

  return (
    <CustomizationContext.Provider value={value}>
      {children}
      {liquidGlassEnabled && (
        <svg aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
          <defs>
            <filter id="liquid-glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency={baseFreq} numOctaves={2} seed={7} result="noise" />
              <feGaussianBlur in="noise" stdDeviation={stdDev} result="blurredNoise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurredNoise"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
=======
  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
};

export function useCustomization() {
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within CustomizationProvider');
  }
  return context;
<<<<<<< HEAD
};
=======
}
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
