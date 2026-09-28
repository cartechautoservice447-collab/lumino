import React from 'react';
import { Bold, Italic, Code, Link2, Image } from 'lucide-react';

interface EditorToolbarProps {
  statusText: string;
  onApplyFormat: (format: 'bold' | 'italic' | 'code' | 'link' | 'image') => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  statusText,
  onApplyFormat,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 py-2 px-4 sm:px-6 border-y border-white/[0.06] bg-white/[0.015] select-none w-full">
      {/* Left Formatting Tools */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* Bold */}
        <button
          type="button"
          onClick={() => onApplyFormat('bold')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
          title="Bold (Ctrl+B)"
          aria-label="Bold formatting"
        >
          <span className="font-bold text-sm">B</span>
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => onApplyFormat('italic')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center italic text-xs transition-colors cursor-pointer"
          title="Italic (Ctrl+I)"
          aria-label="Italic formatting"
        >
          <span className="italic font-serif text-sm">I</span>
        </button>

        {/* Inline Code */}
        <button
          type="button"
          onClick={() => onApplyFormat('code')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center font-mono text-xs transition-colors cursor-pointer"
          title="Inline Code"
          aria-label="Inline code formatting"
        >
          <span className="font-mono text-xs">&lt;&gt;</span>
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => onApplyFormat('link')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="Insert Link"
          aria-label="Insert link"
        >
          <Link2 className="w-3.5 h-3.5" />
        </button>

        {/* Image */}
        <button
          type="button"
          onClick={() => onApplyFormat('image')}
          className="w-7 h-7 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="Insert Image"
          aria-label="Insert image"
        >
          <Image className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right side: Shortcut Hint + Status Text */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-[10px] text-[#6b6e73] font-mono tracking-tight">
          Markdown enabled
        </span>
        <div className="text-[11px] font-mono uppercase tracking-wider text-[#6b6e73]">
          {statusText}
        </div>
      </div>
    </div>
  );
};
