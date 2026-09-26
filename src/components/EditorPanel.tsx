import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Star, Trash2, Check } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { EditorToolbar } from './EditorToolbar';
import { DeleteConfirmModal } from './modals/DeleteConfirmModal';
import { renderMarkdown } from '../utils/markdownRenderer';

export const EditorPanel: React.FC = () => {
  const {
    currentNote,
    collections,
    updateNote,
    deleteNote,
    toggleFavorite,
    reassignNoteCollection,
    editorMode,
    setEditorMode,
    isFullscreenEditor,
    setIsFullscreenEditor,
  } = useNotes();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentNote) {
    return (
      <main 
        aria-label="Note Editor"
        className="glass-panel animate-panel-in h-full rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl"
      >
        <p className="text-sm text-[#9a9da3]">No note selected</p>
        <p className="text-xs text-[#6b6e73] mt-1">
          Select a note from the list or create a new one to begin editing.
        </p>
      </main>
    );
  }

  const currentCol = collections.find((c) => c.id === currentNote.collectionId);
  const collectionName = currentCol ? currentCol.name : 'LECTURE 0';

  // Formatting helpers for textarea
  const handleApplyFormat = (format: 'bold' | 'italic' | 'code' | 'link' | 'image') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = '';
    let cursorOffset = 0;

    switch (format) {
      case 'bold':
        replacement = `**${selectedText || 'bold text'}**`;
        cursorOffset = selectedText ? replacement.length : 2;
        break;
      case 'italic':
        replacement = `*${selectedText || 'italic text'}*`;
        cursorOffset = selectedText ? replacement.length : 1;
        break;
      case 'code':
        replacement = `\`${selectedText || 'code'}\``;
        cursorOffset = selectedText ? replacement.length : 1;
        break;
      case 'link':
        replacement = `[${selectedText || 'Link Title'}](https://example.com)`;
        cursorOffset = selectedText ? replacement.length : 1;
        break;
      case 'image':
        replacement = `![${selectedText || 'Image Description'}](https://example.com/image.png)`;
        cursorOffset = selectedText ? replacement.length : 2;
        break;
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    updateNote(currentNote.id, { body: newText, savedStatus: 'SAVED JUST NOW' });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
    }, 0);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, start) + '  ' + text.substring(end);
      updateNote(currentNote.id, { body: newText, savedStatus: 'SAVED JUST NOW' });
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 2, start + 2);
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      handleApplyFormat('bold');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      handleApplyFormat('italic');
    } else if (e.key === 'Escape' && isFullscreenEditor) {
      e.preventDefault();
      setIsFullscreenEditor(false);
    }
  };

  return (
    <main 
      aria-label="Note Editor"
      className={`glass-panel animate-panel-in h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl overflow-hidden relative ${
        isFullscreenEditor ? 'fixed inset-4 z-50 bg-[#1a1c1f]' : ''
      }`}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-white/[0.06] shrink-0">
        {/* Title Input / Display */}
        <div className="flex-1 min-w-0 mr-4">
          <input
            type="text"
            value={currentNote.title}
            onChange={(e) =>
              updateNote(currentNote.id, {
                title: e.target.value,
                savedStatus: 'SAVED JUST NOW',
              })
            }
            placeholder="Untitled note"
            className="w-full text-xl sm:text-2xl font-bold tracking-tight text-[#f2f2f3] bg-transparent border-none focus:outline-none placeholder-[#6b6e73]"
          />
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Collection Reassignment Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1.5 rounded-lg bg-[#292a2d] hover:bg-[#343538] text-xs font-semibold text-[#f2f2f3] border border-white/[0.06] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{collectionName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9a9da3]" />
            </button>

            {isDropdownOpen && (
              <div className="glass-panel animate-panel-in absolute right-0 mt-2 w-48 rounded-xl border border-white/[0.1] shadow-2xl py-1 z-30">
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#6b6e73] border-b border-white/[0.06]">
                  Move to Collection
                </div>
                {collections.map((col) => {
                  const isCurrent = col.id === currentNote.collectionId;
                  return (
                    <button
                      key={col.id}
                      onClick={() => {
                        reassignNoteCollection(currentNote.id, col.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        isCurrent
                          ? 'bg-[#292a2d] text-[#f2f2f3] font-semibold'
                          : 'text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className="truncate">{col.name}</span>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#3bb360]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(currentNote.id)}
            className="w-8 h-8 rounded-lg text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] flex items-center justify-center transition-colors cursor-pointer"
            title={currentNote.favorited ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={currentNote.favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`w-4 h-4 ${
                currentNote.favorited ? 'text-[#79c0ff] fill-current' : 'text-[#9a9da3]'
              }`}
            />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-8 h-8 rounded-lg text-[#9a9da3] hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-colors cursor-pointer"
            title="Delete note"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Toolbar Row */}
      <EditorToolbar
        mode={editorMode}
        onModeChange={setEditorMode}
        statusText={currentNote.savedStatus || 'SAVED JUST NOW'}
        isFullscreen={isFullscreenEditor}
        onToggleFullscreen={() => setIsFullscreenEditor((prev) => !prev)}
        onApplyFormat={handleApplyFormat}
      />

      {/* Content Area with animate-fade-swap on mode switch */}
      <div 
        key={editorMode} 
        className="animate-fade-swap flex-1 min-h-0 rounded-xl bg-[#14161a] border border-white/[0.06] overflow-hidden flex flex-col"
      >
        {editorMode === 'write' ? (
          <textarea
            ref={textareaRef}
            value={currentNote.body}
            onKeyDown={handleTextareaKeyDown}
            onChange={(e) =>
              updateNote(currentNote.id, {
                body: e.target.value,
                savedStatus: 'SAVED JUST NOW',
              })
            }
            placeholder="Type your markdown note here..."
            className="w-full h-full p-4 sm:p-5 font-mono text-[13px] sm:text-sm leading-relaxed text-[#f2f2f3] bg-transparent resize-none focus:outline-none placeholder-[#6b6e73] selection:bg-[#3bb360]/30 overflow-y-auto"
            spellCheck={false}
          />
        ) : (
          <div 
            tabIndex={0} 
            aria-label="Markdown preview" 
            className="w-full h-full p-5 sm:p-6 overflow-y-auto markdown-preview focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
          >
            {currentNote.body.trim() ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(currentNote.body),
                }}
              />
            ) : (
              <p className="text-xs text-[#6b6e73] italic">No content to preview</p>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        noteTitle={currentNote.title}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deleteNote(currentNote.id);
          setIsDeleteModalOpen(false);
        }}
      />
    </main>
  );
};
