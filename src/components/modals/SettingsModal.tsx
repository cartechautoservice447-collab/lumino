import React from 'react';
import { Settings, X, RotateCcw, Database, User, Palette } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, collections, notes, resetToDemoData } = useNotes();

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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
        className="glass-panel animate-panel-in w-full max-w-lg rounded-2xl p-6 text-left relative shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9a9da3] hover:text-[#f2f2f3] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-[#292a2d] border border-white/[0.06] flex items-center justify-center text-[#f2f2f3]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#f2f2f3]">Settings</h3>
            <p className="text-xs text-[#9a9da3]">Preferences and workspace configuration</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {/* User Profile */}
          <div className="p-3.5 rounded-lg bg-[#14161a] border border-white/[0.06] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#292a2d] text-[#f2f2f3] font-semibold flex items-center justify-center text-sm border border-white/[0.08]">
              {user.avatarLetter}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-[#f2f2f3]">{user.name}</div>
              <div className="text-xs text-[#9a9da3] truncate">{user.email}</div>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/[0.05] text-[#9a9da3] border border-white/[0.06]">
              ACTIVE
            </span>
          </div>

          {/* Theme & Style */}
          <div className="p-3.5 rounded-lg bg-[#14161a] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-[#9a9da3]">
                <Palette className="w-4 h-4 text-[#3bb360]" />
                Visual System
              </span>
              <span className="font-medium text-[#f2f2f3]">Dark Glassmorphism</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-[#9a9da3]">
                <Database className="w-4 h-4 text-[#3bb360]" />
                Syntax Highlight
              </span>
              <span className="font-mono text-[#79c0ff]">GitHub Dark</span>
            </div>
          </div>

          {/* Storage & Data */}
          <div className="p-3.5 rounded-lg bg-[#14161a] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#9a9da3]">Workspace Data</span>
              <span className="text-xs text-[#6b6e73]">localStorage</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-black/30 border border-white/[0.04]">
                <div className="text-[#6b6e73]">Courses</div>
                <div className="text-base font-bold text-[#f2f2f3]">{collections.length}</div>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/[0.04]">
                <div className="text-[#6b6e73]">Total Notes</div>
                <div className="text-base font-bold text-[#f2f2f3]">{notes.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all courses and notes to demo data?')) {
                resetToDemoData();
                onClose();
              }
            }}
            className="px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Demo Data
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-[#3bb360] hover:bg-[#349e54] rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
