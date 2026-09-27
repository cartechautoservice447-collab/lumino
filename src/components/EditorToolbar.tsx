import React from 'react';
import { Bold, Italic, Code, Link2, Image, Maximize2, Minimize2 } from 'lucide-react';
import { EditorMode } from '../types';

interface EditorToolbarProps {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  statusText: string;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onApplyFormat: (format: 'bold' | 'italic' | 'code' | 'link' | 'image') => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  mode,
  onModeChange,
  statusText,
  isFullscreen,
  onToggleFullscreen,
  onApplyFormat,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 px-3 rounded-xl bg-[#14161a] border border-white/[0.06] mb-3">
      {/* Left Formatting Tools */}
      <div className="flex items-center gap-1.5">
        {/* Bold */}
        <button
          type="button"
          onClick={() => onApplyFormat('bold')}
          className="w-8 h-8 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center font-bold text-xs transition-colors"
          title="Bold (Ctrl+B)"
          aria-label="Bold formatting"
        >
          <span className="font-bold text-sm">B</span>
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => onApplyFormat('italic')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center italic text-xs transition-colors"
          title="Italic (Ctrl+I)"
          aria-label="Italic formatting"
        >
          <span className="italic font-serif text-sm">I</span>
        </button>

        {/* Inline Code */}
        <button
          type="button"
          onClick={() => onApplyFormat('code')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center font-mono text-xs transition-colors"
          title="Inline Code"
          aria-label="Inline code formatting"
        >
          <span className="font-mono text-xs">&lt;&gt;</span>
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => onApplyFormat('link')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center text-xs transition-colors"
          title="Insert Link"
          aria-label="Insert link"
        >
          <Link2 className="w-3.5 h-3.5" />
        </button>

        {/* Image */}
        <button
          type="button"
          onClick={() => onApplyFormat('image')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center text-xs transition-colors"
          title="Insert Image"
          aria-label="Insert image"
        >
          <Image className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Middle Status text */}
      <div className="text-[11px] font-mono uppercase tracking-wider text-[#6b6e73]">
        {statusText}
      </div>

      {/* Right Controls: Fullscreen + Write/Preview segmented toggle */}
      <div className="flex items-center gap-3.5">
        {/* Expand / Fullscreen Toggle */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center transition-colors"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Write / Preview Segmented Toggle */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#0c0d0f] border border-white/[0.06]">
          <button
            type="button"
            onClick={() => onModeChange('write')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === 'write'
                ? 'bg-[#292a2d] text-[#f2f2f3] shadow-sm'
                : 'text-[#9a9da3] hover:text-[#f2f2f3]'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => onModeChange('preview')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              mode === 'preview'
                ? 'bg-[#292a2d] text-[#f2f2f3] shadow-sm'
                : 'text-[#9a9da3] hover:text-[#f2f2f3]'
            }`}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};
