import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

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

export const MOTION_DESCRIPTIONS: Record<MotionMode, string> = {
  low: 'Animations off — maximum performance and battery saving.',
  medium: 'Standard transitions for layout changes and card hovers.',
  high: 'Fluid panel resizing, hover scaling and button press depth.',
  ultra: 'Spring easing, micro-pulse glow rings and GPU-accelerated transitions.',
};

const MOTION_SCALES: Record<MotionMode, number> = {
  low: 0,
  medium: 0.7,
  high: 1,
  ultra: 1.25,
};

const DEFAULT_SETTINGS: CustomizationSettings = {
  theme: 'original',
  glassPreset: 'high',
  ...GLASS_PRESETS.high,
  motion: 'high',
  uiFont: 'inter',
  uiFontSize: 15,
  uiLineHeight: 1.55,
  editorFontSize: 14,
  editorLineHeight: 1.8,
};

const STORAGE_KEY = 'glass-notes:customization:v1';

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

  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
};

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within CustomizationProvider');
  }
  return context;
}
