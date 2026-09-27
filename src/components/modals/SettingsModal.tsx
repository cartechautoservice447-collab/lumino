import React from 'react';
import {
  Check,
  Database,
  Layers3,
  Palette,
  RotateCcw,
  Settings2,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useNotes } from '../../context/NotesContext';
import {
  ENGINE_DEFAULTS,
  ENGINE_PROFILES,
  useEngineSettings,
} from '../../context/EngineSettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = '',
  onChange,
}) => (
  <label className="engine-control">
    <span className="engine-control-line">
      <span>{label}</span>
      <strong>
        {value}
        {suffix}
      </strong>
    </span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label={label}
      onInput={(event) => onChange(Number(event.currentTarget.value))}
      onChange={(event) => onChange(Number(event.currentTarget.value))}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerMove={(event) => event.stopPropagation()}
      onPointerUp={(event) => event.stopPropagation()}
    />
  </label>
);

const Toggle: React.FC<{
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}> = ({ label, description, checked, onChange }) => (
  <label className="engine-toggle">
    <span>
      <strong>{label}</strong>
      <small>{description}</small>
    </span>
    <input
      type="checkbox"
      checked={checked}
      aria-label={label}
      onChange={(event) => onChange(event.target.checked)}
    />
    <span className="engine-toggle-track" aria-hidden="true">
      <span />
    </span>
  </label>
);

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, collections, notes, resetToDemoData } = useNotes();
  const { settings, update, applyProfile, reset } = useEngineSettings();

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDefault = JSON.stringify(settings) === JSON.stringify(ENGINE_DEFAULTS);

  return (
    <div
      className="engine-customization-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="engine-customization-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="engine-customization-title"
      >
        <header className="engine-customization-header">
          <div className="engine-customization-title">
            <span className="engine-customization-icon">
              <Settings2 size={20} />
            </span>
            <div>
              <span className="engine-eyebrow">Lumino Glass Engine</span>
              <h3 id="engine-customization-title">Engine Customization</h3>
              <p>Fine-tune the same dark glass language, proportions, motion, and card sizing used by the reference UI.</p>
            </div>
          </div>
          <button type="button" className="engine-modal-close" onClick={onClose} aria-label="Close settings">
            <X size={18} />
          </button>
        </header>

        <div className="engine-customization-scroll">
          <section className="engine-section">
            <div className="engine-section-heading">
              <span>Glass Profile</span>
              <small>Choose a starting calibration, then fine-tune individual controls below.</small>
            </div>

            <div className="engine-profile-grid">
              {ENGINE_PROFILES.map((profile) => {
                const active = settings.profile === profile.id;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    className={`engine-profile ${active ? 'active' : ''}`}
                    onClick={() => applyProfile(profile.id)}
                    aria-pressed={active}
                  >
                    <span className="engine-profile-top">
                      <strong>{profile.name}</strong>
                      {active && <Check size={15} />}
                    </span>
                    <small>{profile.description}</small>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="engine-section">
            <div className="engine-section-heading">
              <span>Glass Material</span>
              <small>Controls the visual weight and translucency of every primary glass panel and note card.</small>
            </div>
            <Slider label="Blur" value={settings.blur} min={8} max={36} suffix=" px" onChange={(value) => update('blur', value)} />
            <Slider label="Glass opacity" value={settings.opacity} min={18} max={52} suffix="%" onChange={(value) => update('opacity', value)} />
            <Slider label="Border strength" value={settings.border} min={2} max={16} suffix="%" onChange={(value) => update('border', value)} />
            <Slider label="Saturation" value={settings.saturation} min={90} max={190} suffix="%" onChange={(value) => update('saturation', value)} />
            <Slider label="Corner radius" value={settings.radius} min={12} max={30} suffix=" px" onChange={(value) => update('radius', value)} />
            <Slider label="Shadow depth" value={settings.shadow} min={20} max={95} suffix="%" onChange={(value) => update('shadow', value)} />
          </section>

          <section className="engine-section">
            <div className="engine-section-heading">
              <span>Background & Finish</span>
              <small>Adjust the green ambient glow and the subtle texture visible behind the glass.</small>
            </div>
            <Slider label="Ambient glow" value={settings.glow} min={0} max={20} suffix="%" onChange={(value) => update('glow', value)} />
            <Toggle
              label="Grain texture"
              description="Keep the fine reference texture across the application background."
              checked={settings.grain}
              onChange={(value) => update('grain', value)}
            />
            <Slider label="Grain intensity" value={settings.grainIntensity} min={0} max={6} step={0.5} suffix="%" onChange={(value) => update('grainIntensity', value)} />
          </section>

          <section className="engine-section">
            <div className="engine-section-heading">
              <span>Motion</span>
              <small>Control hover lift and transition speed without changing the underlying app interactions.</small>
            </div>
            <Slider label="Hover lift" value={settings.hoverLift} min={0} max={5} suffix=" px" onChange={(value) => update('hoverLift', value)} />
            <Slider label="Transition speed" value={settings.motion} min={120} max={600} suffix=" ms" onChange={(value) => update('motion', value)} />
          </section>

          <section className="engine-section">
            <div className="engine-section-heading">
              <span>Reference Layout Dimensions</span>
              <small>These defaults reproduce the proportions visible in the supplied 1708×892 reference screenshot.</small>
            </div>
            <div className="engine-dimension-grid">
              <div className="engine-dimension-card">
                <Layers3 size={15} />
                <span>Sidebar rail</span>
                <strong>{settings.sidebarWidth}px</strong>
              </div>
              <div className="engine-dimension-card">
                <Layers3 size={15} />
                <span>Notes rail</span>
                <strong>{settings.notesWidth}px</strong>
              </div>
              <div className="engine-dimension-card">
                <Database size={15} />
                <span>Note card</span>
                <strong>{settings.noteCardHeight}px</strong>
              </div>
              <div className="engine-dimension-card">
                <Database size={15} />
                <span>Course card</span>
                <strong>{settings.courseCardHeight}px</strong>
              </div>
            </div>
            <Slider label="Sidebar width" value={settings.sidebarWidth} min={280} max={330} suffix=" px" onChange={(value) => update('sidebarWidth', value)} />
            <Slider label="Notes width" value={settings.notesWidth} min={380} max={440} suffix=" px" onChange={(value) => update('notesWidth', value)} />
            <Slider label="Note card height" value={settings.noteCardHeight} min={112} max={155} suffix=" px" onChange={(value) => update('noteCardHeight', value)} />
            <Slider label="Course card height" value={settings.courseCardHeight} min={190} max={250} suffix=" px" onChange={(value) => update('courseCardHeight', value)} />
          </section>

          <section className="engine-section">
            <div className="engine-section-heading">
              <span>Workspace Information</span>
              <small>Current account and local workspace statistics remain unchanged.</small>
            </div>

            <div className="engine-profile-summary">
              <div className="engine-avatar">
                {user.avatarLetter}
              </div>
              <div className="engine-profile-copy">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
              <span className="engine-active-badge">ACTIVE</span>
            </div>

            <div className="engine-stat-grid">
              <div>
                <span><Palette size={14} /> Visual system</span>
                <strong>Dark Glassmorphism</strong>
              </div>
              <div>
                <span><User size={14} /> Account</span>
                <strong>Local workspace</strong>
              </div>
              <div>
                <span><Database size={14} /> Courses</span>
                <strong>{collections.length}</strong>
              </div>
              <div>
                <span><Sparkles size={14} /> Total notes</span>
                <strong>{notes.length}</strong>
              </div>
            </div>
          </section>
        </div>

        <footer className="engine-customization-footer">
          <button
            type="button"
            className="engine-secondary-button"
            onClick={reset}
            disabled={isDefault}
          >
            <RotateCcw size={15} />
            Reset engine
          </button>

          <button
            type="button"
            className="engine-danger-button"
            onClick={() => {
              if (window.confirm('Reset all courses and notes to demo data?')) {
                resetToDemoData();
                onClose();
              }
            }}
          >
            Reset demo data
          </button>

          <button type="button" className="engine-primary-button" onClick={onClose}>
            Done
          </button>
        </footer>
      </section>
    </div>
  );
};
