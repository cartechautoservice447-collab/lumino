import React, { useEffect } from 'react';
import { X, RotateCcw, Sliders, Check } from 'lucide-react';
import {
  useCustomization,
  ThemeMode,
  GlassPreset,
  MotionMode,
  UIFont,
  MOTION_DESCRIPTIONS,
} from '../../context/CustomizationContext';

interface EngineCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'original', label: 'Original' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'White / Light' },
];

const GLASS_OPTIONS: { value: Exclude<GlassPreset, 'custom'>; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'ultra', label: 'Ultra' },
];

const MOTION_OPTIONS: { value: MotionMode; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'ultra', label: 'Ultra' },
];

const FONT_OPTIONS: { value: UIFont; label: string }[] = [
  { value: 'inter', label: 'Inter' },
  { value: 'system', label: 'System Sans' },
  { value: 'mono', label: 'JetBrains Mono' },
];

interface SliderControlProps {
  label: string;
  value: number;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  suffix = '',
  min,
  max,
  step,
  onChange,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums font-mono text-foreground/80 font-medium">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3bb360]"
      />
    </div>
  );
};

interface SectionProps {
  title: string;
  hint?: string;
  children: React.ReactNode;
}

const CustomSection: React.FC<SectionProps> = ({ title, hint, children }) => (
  <section className="space-y-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
    <div>
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground/80">
        {title}
      </h3>
      {hint && <p className="mt-1 text-xs text-muted-foreground/70 leading-relaxed">{hint}</p>}
    </div>
    {children}
  </section>
);

export const EngineCustomizationModal: React.FC<EngineCustomizationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { settings, update, applyGlassPreset, reset } = useCustomization();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        className="glass-panel animate-panel-in w-full max-w-[560px] max-h-[88vh] overflow-y-auto rounded-2xl p-6 text-left relative shadow-2xl border border-white/10"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#3bb360]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Engine Customization
              </h2>
              <p className="text-xs text-muted-foreground">
                Real-time visual, layout, and rendering engine controls
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Color theme */}
          <CustomSection title="Color theme">
            <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-1">
              {THEME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update({ theme: opt.value })}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                    settings.theme === opt.value
                      ? 'bg-white/[0.12] text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  {settings.theme === opt.value && <Check className="w-3 h-3 text-[#3bb360]" />}
                  {opt.label}
                </button>
              ))}
            </div>
          </CustomSection>

          {/* Glass quality */}
          <CustomSection
            title="Glass quality"
            hint={settings.glassPreset === 'custom' ? 'Custom calibrated parameters' : undefined}
          >
            <div className="grid grid-cols-2 gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-1 sm:grid-cols-4">
              {GLASS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => applyGlassPreset(opt.value)}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                    settings.glassPreset === opt.value
                      ? 'bg-white/[0.12] text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  {settings.glassPreset === opt.value && (
                    <Check className="w-3 h-3 text-[#3bb360]" />
                  )}
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="space-y-3 pt-2">
              <SliderControl
                label="Glass blur"
                value={settings.glassBlur}
                suffix="px"
                min={0}
                max={32}
                step={1}
                onChange={(val) => update({ glassBlur: val })}
              />
              <SliderControl
                label="Glass transparency"
                value={settings.glassOpacity}
                suffix="%"
                min={10}
                max={90}
                step={1}
                onChange={(val) => update({ glassOpacity: val })}
              />
              <SliderControl
                label="Glass thickness"
                value={settings.glassThickness}
                suffix="px"
                min={0}
                max={4}
                step={0.5}
                onChange={(val) => update({ glassThickness: val })}
              />
            </div>
          </CustomSection>

          {/* Motion & fluidity */}
          <CustomSection
            title="Motion & fluidity"
            hint={MOTION_DESCRIPTIONS[settings.motion]}
          >
            <div className="grid grid-cols-2 gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-1 sm:grid-cols-4">
              {MOTION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update({ motion: opt.value })}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                    settings.motion === opt.value
                      ? 'bg-white/[0.12] text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  {settings.motion === opt.value && <Check className="w-3 h-3 text-[#3bb360]" />}
                  {opt.label}
                </button>
              ))}
            </div>
          </CustomSection>

          {/* Typography */}
          <CustomSection title="Typography">
            <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-1">
              {FONT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => update({ uiFont: opt.value })}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                    settings.uiFont === opt.value
                      ? 'bg-white/[0.12] text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                >
                  {settings.uiFont === opt.value && <Check className="w-3 h-3 text-[#3bb360]" />}
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="space-y-3 pt-2">
              <SliderControl
                label="UI font size"
                value={settings.uiFontSize}
                suffix="px"
                min={12}
                max={20}
                step={1}
                onChange={(val) => update({ uiFontSize: val })}
              />
              <SliderControl
                label="UI line height"
                value={settings.uiLineHeight}
                min={1.2}
                max={2}
                step={0.05}
                onChange={(val) => update({ uiLineHeight: Number(val.toFixed(2)) })}
              />
              <SliderControl
                label="Editor font size"
                value={settings.editorFontSize}
                suffix="px"
                min={11}
                max={22}
                step={1}
                onChange={(val) => update({ editorFontSize: val })}
              />
              <SliderControl
                label="Editor line height"
                value={settings.editorLineHeight}
                min={1.2}
                max={2.4}
                step={0.05}
                onChange={(val) => update({ editorLineHeight: Number(val.toFixed(2)) })}
              />
            </div>
          </CustomSection>

          {/* Reset Button */}
          <button
            type="button"
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.04] px-3 py-2.5 text-xs font-medium text-muted-foreground transition-all hover:bg-white/[0.08] hover:text-foreground cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset to defaults
          </button>
        </div>
      </div>
    </div>
  );
};
