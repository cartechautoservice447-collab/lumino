import React, { useMemo } from 'react';
import { PanelLeftClose } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { NoteCard } from './NoteCard';

interface NoteListPanelProps {
  onCollapse?: () => void;
}

export const NoteListPanel: React.FC<NoteListPanelProps> = ({ onCollapse }) => {
  const {
    activeFilter,
    collections,
    filteredNotes,
    currentNoteId,
    setCurrentNoteId,
    toggleFavorite,
    totalNotesCount,
    favoritesCount,
    searchQuery,
  } = useNotes();

  // Resolved dynamic title and total count for header
  const headerInfo = useMemo(() => {
    if (activeFilter === 'all') {
      return {
        title: 'All Notes',
        count: totalNotesCount,
      };
    }
    if (activeFilter === 'favorites') {
      return {
        title: 'Favorites',
        count: favoritesCount,
      };
    }
    const currentColl = collections.find((c) => c.id === activeFilter);
    return {
      title: currentColl ? currentColl.name : 'Notes',
      count: filteredNotes.length,
    };
  }, [activeFilter, collections, totalNotesCount, favoritesCount, filteredNotes.length]);

  return (
    <section 
      aria-label="Notes List"
      className="glass-panel animate-panel-in flex h-full w-full flex-col overflow-hidden shadow-xl"
    >
      {/* Pinned Header Row - Spans full width edge-to-edge */}
      <header className="flex items-center justify-between gap-2 border-b border-white/5 px-5 py-5 shrink-0">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-[#f2f2f3] truncate">
            {headerInfo.title}
          </h2>
          <span className="text-xs text-[#9a9da3] font-medium shrink-0 tabular-nums">
            {headerInfo.count} {headerInfo.count === 1 ? 'note' : 'notes'}
          </span>
        </div>

        <button
          onClick={onCollapse}
          className="w-9 h-9 rounded-xl text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.04] border border-white/5 flex items-center justify-center transition-colors shrink-0"
          title="Collapse note list"
          aria-label="Collapse note list"
        >
          <PanelLeftClose className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Scrollable list of NoteCards with p-3 so hover scale [1.015] never clips left/right borders */}
      <div 
        aria-label="List of notes" 
        className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 focus:outline-none"
      >
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center p-4">
            <p className="text-xs text-[#9a9da3] font-medium">
              {searchQuery ? 'No matching notes found' : 'Nothing here yet.'}
            </p>
            <p className="text-[11px] text-[#6b6e73] mt-1">
              Click "+ New Note" in the sidebar to create one.
            </p>
          </div>
        ) : (
          filteredNotes.map((note, index) => {
            const col = collections.find((c) => c.id === note.collectionId);
            const colName = col ? col.name : 'GENERAL';

            return (
              <NoteCard
                key={note.id}
                note={note}
                collectionName={colName}
                isSelected={note.id === currentNoteId}
                index={index}
                onSelect={() => setCurrentNoteId(note.id)}
                onToggleFavorite={() => toggleFavorite(note.id)}
              />
            );
          })
        )}
      </div>
    </section>
  );
};
