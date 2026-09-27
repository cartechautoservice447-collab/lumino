import React from 'react';
import { PenLine, Eye } from 'lucide-react';
import { EditorMode } from '../types';

interface EditorModeSwitchProps {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  className?: string;
}

export const EditorModeSwitch: React.FC<EditorModeSwitchProps> = ({
  mode,
  onModeChange,
  className = '',
}) => {
  const isPreview = mode === 'preview';

  return (
    <div
      role="group"
      aria-label="Editor view mode"
      className={`inline-flex items-center p-0.5 rounded-lg bg-[#14161a] border border-white/[0.08] shadow-inner select-none ${className}`}
    >
      {/* Edit Mode Icon */}
      <button
        type="button"
        onClick={() => onModeChange('write')}
        title="Edit mode"
        aria-label="Edit mode"
        aria-pressed={!isPreview}
        className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150 cursor-pointer ${
          !isPreview
            ? 'bg-[#292a2d] text-[#3bb360] shadow-sm'
            : 'text-[#8a8d93] hover:text-[#f2f2f3] hover:bg-white/[0.04]'
        }`}
      >
        <PenLine className="w-3.5 h-3.5" />
      </button>

      {/* Preview Mode Icon */}
      <button
        type="button"
        onClick={() => onModeChange('preview')}
        title="Preview mode"
        aria-label="Preview mode"
        aria-pressed={isPreview}
        className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-150 cursor-pointer ${
          isPreview
            ? 'bg-[#292a2d] text-[#3bb360] shadow-sm'
            : 'text-[#8a8d93] hover:text-[#f2f2f3] hover:bg-white/[0.04]'
        }`}
      >
        <Eye className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
