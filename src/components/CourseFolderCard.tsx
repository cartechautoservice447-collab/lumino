import React from 'react';
import { Folder, ArrowRight } from 'lucide-react';
import { Collection } from '../types';

interface CourseFolderCardProps {
  collection: Collection;
  noteCount: number;
  footerText: string;
  index: number;
  onClick: () => void;
}

export const CourseFolderCard: React.FC<CourseFolderCardProps> = ({
  collection,
  noteCount,
  footerText,
  index,
  onClick,
}) => {
  // Strict rule:
  // - if noteCount === 0: show "No notes yet"
  // - else: show "Last edited {relative-or-absolute date}"
  const resolvedFooterText =
    noteCount === 0
      ? 'No notes yet'
      : footerText.startsWith('Last edited')
      ? footerText
      : `Last edited ${footerText}`;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      style={{ animationDelay: `${index * 45}ms` }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="glass-panel animate-panel-in group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.015] hover:border-white/20 cursor-pointer flex flex-col justify-between shadow-xl"
    >
      <div>
        {/* Top row: Folder icon chip + Note count pill */}
        <div className="flex items-center justify-between mb-5">
          <div 
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-[#3bb360] shadow-[0_0_24px_-6px_rgba(59,179,96,0.7)] group-hover:scale-105 transition-transform duration-200"
            style={{ color: '#3bb360' }}
          >
            <Folder 
              className="w-5 h-5 text-[#3bb360]" 
              style={{ color: '#3bb360', stroke: '#3bb360' }} 
              strokeWidth={2}
            />
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs tabular-nums text-[#9a9da3] font-medium">
            {noteCount} {noteCount === 1 ? 'note' : 'notes'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[#f2f2f3] tracking-tight mb-2 group-hover:text-white transition-colors">
          {collection.name}
        </h3>

        {/* Tag badge */}
        <div className="mb-4">
          <span className="inline-block text-[10px] font-semibold tracking-wider uppercase text-[#9a9da3] bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
            {collection.tag || 'GENERAL'}
          </span>
        </div>
      </div>

      <div>
        {/* Thin divider */}
        <div className="border-t border-white/5 mb-3" />

        {/* Footer line with hover action reveal */}
        <div className="flex items-center justify-between text-xs text-[#6b6e73]">
          <span className="font-normal">{resolvedFooterText}</span>
          <span className="flex items-center gap-1.5 text-xs text-[#9a9da3] opacity-0 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 group-hover:text-[#f2f2f3] group-hover:opacity-100">
            <span>Open Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
