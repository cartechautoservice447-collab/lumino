import React from 'react';
import { Star } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  collectionName: string;
  isSelected: boolean;
  index: number;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  collectionName,
  isSelected,
  index,
  onSelect,
  onToggleFavorite,
}) => {
  // Extract a clean 2-line preview from the markdown body
  const cleanPreview = React.useMemo(() => {
    if (!note.body || !note.body.trim()) return null;
    return note.body
      .replace(/^#+\s+/gm, '') // remove headings
      .replace(/```[\s\S]*?```/g, '') // remove code blocks
      .replace(/`([^`]+)`/g, '$1') // remove inline code
      .replace(/[*_~[\]]/g, '') // remove formatting tokens
      .replace(/>\s+/gm, '') // remove blockquotes
      .trim()
      .replace(/\s+/g, ' '); // collapse extra whitespace
  }, [note.body]);

  const metaString = `${note.metaDateText} • ${collectionName.toUpperCase()}`;

  return (
    <button
      type="button"
      onClick={onSelect}
      style={{ animationDelay: `${Math.min(index, 10) * 35}ms` }}
      className={`glass-note-card group animate-card-in w-full border text-left transition-all duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0 ${
        isSelected
          ? 'is-selected border-white/20 bg-white/[0.08] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)]'
          : 'border-white/5 bg-white/[0.03] hover:-translate-y-0.5 hover:scale-[1.015] hover:border-white/15 hover:bg-white/[0.06]'
      }`}
    >
      {/* Title & Favorite Star */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-base font-bold text-[#f2f2f3] truncate leading-tight flex-1">
          {note.title || 'Untitled note'}
        </h4>

        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }
          }}
          className="text-[#6b6e73] hover:text-[#f2f2f3] transition-colors p-0.5 rounded -mr-0.5 -mt-0.5 cursor-pointer outline-none focus:outline-none"
          title={note.favorited ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={note.favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star
            className={`w-[18px] h-[18px] transition-colors ${
              note.favorited
                ? 'text-[#79c0ff] fill-current'
                : 'text-[#6b6e73] group-hover:text-[#9a9da3]'
            }`}
          />
        </span>
      </div>

      {/* 2-line clamped preview text or "Empty note" */}
      <div className="note-preview-text mb-3 line-clamp-2 leading-relaxed">
        {cleanPreview ? (
          <p className="text-[#9a9da3]">{cleanPreview}</p>
        ) : (
          <p className="text-[#6b6e73] italic">Empty note</p>
        )}
      </div>

      {/* Metadata Line */}
      <div className="text-[11px] uppercase font-mono tracking-[0.13em] text-[#6b6e73]">
        {metaString}
      </div>
    </button>
  );
};
