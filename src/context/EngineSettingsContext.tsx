import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type EngineProfile = 'reference' | 'soft' | 'crisp' | 'deep';

export interface EngineSettings {
  profile: EngineProfile;
  blur: number;
  opacity: number;
  border: number;
  saturation: number;
  radius: number;
  shadow: number;
  glow: number;
  grain: boolean;
  grainIntensity: number;
  hoverLift: number;
  motion: number;
  sidebarWidth: number;
  notesWidth: number;
  noteCardHeight: number;
  courseCardHeight: number;
}

const STORAGE_KEY = 'lumino_engine_customization_v1';

export const ENGINE_DEFAULTS: EngineSettings = {
  profile: 'reference',
  blur: 18,
  opacity: 32,
  border: 6,
  saturation: 140,
  radius: 20,
  shadow: 70,
  glow: 8,
  grain: true,
  grainIntensity: 2.5,
  hoverLift: 2,
  motion: 300,
  sidebarWidth: 302,
  notesWidth: 402,
  noteCardHeight: 130,
  courseCardHeight: 220,
};

export const ENGINE_PROFILES: Array<{
  id: EngineProfile;
  name: string;
  description: string;
  values: Partial<EngineSettings>;
}> = [
  {
    id: 'reference',
    name: 'Reference',
    description: 'Balanced dark glass matching the supplied notes UI.',
    values: ENGINE_DEFAULTS,
  },
  {
    id: 'soft',
    name: 'Soft Frost',
    description: 'Brighter, softer glass with less visual weight.',
    values: { blur: 24, opacity: 27, border: 5, saturation: 135, radius: 22, shadow: 48, glow: 5 },
  },
  {
    id: 'crisp',
    name: 'Crisp Glass',
    description: 'Sharper edges, stronger contrast, tighter refraction feel.',
    values: { blur: 12, opacity: 36, border: 9, saturation: 160, radius: 18, shadow: 78, glow: 9 },
  },
  {
    id: 'deep',
    name: 'Deep OLED',
    description: 'Darker panels with restrained highlights and depth.',
    values: { blur: 16, opacity: 40, border: 4, saturation: 120, radius: 20, shadow: 88, glow: 3 },
  },
];

function clamp(value: unknown, min: number, max: number, fallback: number) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.min(max, Math.max(min, numeric)) : fallback;
}

function normalize(raw: Partial<EngineSettings>): EngineSettings {
  const profile = raw.profile === 'soft' || raw.profile === 'crisp' || raw.profile === 'deep'
    ? raw.profile
    : 'reference';

  return {
    profile,
    blur: clamp(raw.blur, 8, 36, ENGINE_DEFAULTS.blur),
    opacity: clamp(raw.opacity, 18, 52, ENGINE_DEFAULTS.opacity),
    border: clamp(raw.border, 2, 16, ENGINE_DEFAULTS.border),
    saturation: clamp(raw.saturation, 90, 190, ENGINE_DEFAULTS.saturation),
    radius: clamp(raw.radius, 12, 30, ENGINE_DEFAULTS.radius),
    shadow: clamp(raw.shadow, 20, 95, ENGINE_DEFAULTS.shadow),
    glow: clamp(raw.glow, 0, 20, ENGINE_DEFAULTS.glow),
    grain: Boolean(raw.grain ?? ENGINE_DEFAULTS.grain),
    grainIntensity: clamp(raw.grainIntensity, 0, 6, ENGINE_DEFAULTS.grainIntensity),
    hoverLift: clamp(raw.hoverLift, 0, 5, ENGINE_DEFAULTS.hoverLift),
    motion: clamp(raw.motion, 120, 600, ENGINE_DEFAULTS.motion),
    sidebarWidth: clamp(raw.sidebarWidth, 280, 330, ENGINE_DEFAULTS.sidebarWidth),
    notesWidth: clamp(raw.notesWidth, 380, 440, ENGINE_DEFAULTS.notesWidth),
    noteCardHeight: clamp(raw.noteCardHeight, 112, 155, ENGINE_DEFAULTS.noteCardHeight),
    courseCardHeight: clamp(raw.courseCardHeight, 190, 250, ENGINE_DEFAULTS.courseCardHeight),
  };
}

function readStored(): EngineSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalize(JSON.parse(raw)) : ENGINE_DEFAULTS;
  } catch {
    return ENGINE_DEFAULTS;
  }
}

interface EngineSettingsContextType {
  settings: EngineSettings;
  update: (key: keyof EngineSettings, value: EngineSettings[keyof EngineSettings]) => void;
  applyProfile: (profile: EngineProfile) => void;
  reset: () => void;
}

const EngineSettingsContext = createContext<EngineSettingsContextType | undefined>(undefined);

export const EngineSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<EngineSettings>(() => readStored());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Browser storage is best-effort.
    }

    const root = document.documentElement;
    root.style.setProperty('--lumino-glass-blur', `${settings.blur}px`);
    root.style.setProperty('--lumino-glass-alpha', String(settings.opacity / 100));
    root.style.setProperty('--lumino-glass-border', String(settings.border / 100));
    root.style.setProperty('--lumino-glass-saturation', `${settings.saturation}%`);
    root.style.setProperty('--lumino-glass-radius', `${settings.radius}px`);
    root.style.setProperty('--lumino-glass-shadow', String(settings.shadow / 100));
    root.style.setProperty('--lumino-glow-alpha', String(settings.glow / 100));
    root.style.setProperty('--lumino-grain-alpha', String(settings.grain && settings.grainIntensity > 0 ? settings.grainIntensity / 100 : 0));
    root.style.setProperty('--lumino-hover-lift', `${settings.hoverLift}px`);
    root.style.setProperty('--lumino-motion', `${settings.motion}ms`);
    root.style.setProperty('--lumino-sidebar-width', `${settings.sidebarWidth}px`);
    root.style.setProperty('--lumino-notes-width', `${settings.notesWidth}px`);
    root.style.setProperty('--lumino-note-card-height', `${settings.noteCardHeight}px`);
    root.style.setProperty('--lumino-course-card-height', `${settings.courseCardHeight}px`);
  }, [settings]);

  const value = useMemo<EngineSettingsContextType>(() => ({
    settings,
    update: (key, value) => {
      setSettings((current) => normalize({ ...current, [key]: value, profile: key === 'profile' ? value : 'reference' }));
    },
    applyProfile: (profile) => {
      const preset = ENGINE_PROFILES.find((item) => item.id === profile)?.values ?? ENGINE_DEFAULTS;
      setSettings((current) => normalize({
        ...current,
        ...preset,
        profile,
      }));
    },
    reset: () => setSettings(ENGINE_DEFAULTS),
  }), [settings]);

  return (
    <EngineSettingsContext.Provider value={value}>
      {children}
    </EngineSettingsContext.Provider>
  );
};

export const useEngineSettings = () => {
  const context = useContext(EngineSettingsContext);
  if (!context) {
    throw new Error('useEngineSettings must be used within EngineSettingsProvider');
  }
  return context;
};
