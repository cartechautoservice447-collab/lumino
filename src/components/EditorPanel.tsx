import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Trash2, Check, Folder, FolderOpen, Plus, ExternalLink, FileText, ChevronDown, ChevronRight, Search, Star } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { EditorToolbar } from './EditorToolbar';
import { EditorModeSwitch } from './EditorModeSwitch';
import { DeleteConfirmModal } from './modals/DeleteConfirmModal';
import { AddCourseModal } from './modals/AddCourseModal';
import { renderMarkdown } from '../utils/markdownRenderer';

export const EditorPanel: React.FC = () => {
  const {
    currentNote,
    collections,
    notes,
    setCurrentNoteId,
    addNote,
    updateNote,
    deleteNote,
    reassignNoteCollection,
    editorMode,
    setEditorMode,
    getCollectionNoteCount,
    addCollection,
    setCurrentView,
  } = useNotes();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [searchSavedNotes, setSearchSavedNotes] = useState('');
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleCollectionExpanded = (colId: string) => {
    setExpandedCollections((prev) => ({
      ...prev,
      [colId]: prev[colId] !== undefined ? !prev[colId] : false,
    }));
  };

  const isColExpanded = (colId: string) => {
    if (searchSavedNotes.trim()) return true;
    return expandedCollections[colId] !== undefined ? expandedCollections[colId] : true;
  };

  const notesByCollection = useMemo(() => {
    const query = searchSavedNotes.toLowerCase().trim();
    return collections.map((col) => {
      const colNotes = notes.filter((n) => n.collectionId === col.id);
      const filtered = query
        ? colNotes.filter(
            (n) =>
              n.title.toLowerCase().includes(query) ||
              n.body.toLowerCase().includes(query)
          )
        : colNotes;
      return {
        ...col,
        notes: filtered,
        totalCount: colNotes.length,
      };
    });
  }, [collections, notes, searchSavedNotes]);

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
    }
  };

  return (
    <main 
      aria-label="Note Editor"
      className="glass-panel animate-panel-in h-full rounded-2xl flex flex-col justify-between shadow-xl overflow-hidden relative"
    >
      {/* Top Header Action Column - Expanded to far left & right edges */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-white/[0.06] shrink-0 bg-white/[0.015]">
        {/* Left: Collection Icon Only (click to open saved collections list) */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#3bb360] border border-white/[0.08] hover:border-white/[0.16] flex items-center justify-center transition-all cursor-pointer select-none active:scale-[0.96] shadow-sm shrink-0"
            title={`Collection: ${collectionName} (Click to view saved collections)`}
            aria-label={`Collection: ${collectionName}`}
            aria-expanded={isDropdownOpen}
          >
            {isDropdownOpen ? (
              <FolderOpen className="w-4 h-4 text-[#3bb360]" />
            ) : (
              <Folder className="w-4 h-4 text-[#3bb360]" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="glass-panel animate-panel-in absolute left-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/[0.12] shadow-2xl p-3 z-40 flex flex-col max-h-[70vh]">
              {/* Header */}
              <div className="flex items-center justify-between px-1 pb-2 border-b border-white/[0.06] mb-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-[#3bb360]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f2f2f3]">
                    Saved Notes by Collection
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#9a9da3]">
                  {notes.length} total
                </span>
              </div>

              {/* Search Filter for saved notes */}
              <div className="relative mb-2 shrink-0">
                <Search className="w-3.5 h-3.5 text-[#9a9da3] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchSavedNotes}
                  onChange={(e) => setSearchSavedNotes(e.target.value)}
                  placeholder="Search saved notes..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-[#3bb360]/50 text-xs text-[#f2f2f3] placeholder-[#6b6e73] focus:outline-none transition-colors"
                />
              </div>

              {/* Scrollable list of collections with saved notes inside */}
              <div className="overflow-y-auto space-y-2 flex-1 pr-1 -mr-1">
                {notesByCollection.map((col) => {
                  const isCurrentCol = col.id === currentNote.collectionId;
                  const expanded = isColExpanded(col.id);

                  return (
                    <div
                      key={col.id}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                    >
                      {/* Collection Group Header */}
                      <div
                        onClick={() => toggleCollectionExpanded(col.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors select-none ${
                          isCurrentCol
                            ? 'text-white bg-white/[0.05]'
                            : 'text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[#9a9da3]">
                            {expanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </span>
                          <Folder className="w-3.5 h-3.5 text-[#3bb360] shrink-0" />
                          <span className="truncate">{col.name}</span>
                          <span className="text-[10px] font-mono text-[#6b6e73] font-normal shrink-0">
                            ({col.totalCount})
                          </span>
                        </div>

                        <div
                          className="flex items-center gap-1.5 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Reassign current note here button */}
                          {!isCurrentCol && (
                            <button
                              type="button"
                              onClick={() => {
                                reassignNoteCollection(currentNote.id, col.id);
                              }}
                              title="Move this current note to this collection"
                              className="px-2 py-0.5 rounded text-[10px] font-medium text-[#9a9da3] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
                            >
                              Move here
                            </button>
                          )}

                          {/* Quick add note inside this collection */}
                          <button
                            type="button"
                            onClick={() => {
                              const newId = addNote(col.id);
                              setCurrentNoteId(newId);
                              setIsDropdownOpen(false);
                            }}
                            title="Create new note in this collection"
                            className="w-5 h-5 rounded hover:bg-white/[0.08] text-[#9a9da3] hover:text-[#3bb360] flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* List of saved notes inside this collection */}
                      {expanded && (
                        <div className="px-1.5 pb-1.5 space-y-0.5 border-t border-white/[0.04] pt-1">
                          {col.notes.length === 0 ? (
                            <p className="text-[11px] text-[#6b6e73] italic py-1 px-3">
                              {searchSavedNotes
                                ? 'No matching notes'
                                : 'No saved notes in this collection'}
                            </p>
                          ) : (
                            col.notes.map((note) => {
                              const isSelected = note.id === currentNote.id;
                              return (
                                <button
                                  key={note.id}
                                  type="button"
                                  onClick={() => {
                                    setCurrentNoteId(note.id);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-left transition-colors cursor-pointer group ${
                                    isSelected
                                      ? 'bg-[#3bb360]/20 text-white font-medium border border-[#3bb360]/30'
                                      : 'text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.05]'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <FileText
                                      className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                                        isSelected
                                          ? 'text-[#3bb360]'
                                          : 'text-[#6b6e73] group-hover:text-[#9a9da3]'
                                      }`}
                                    />
                                    <span className="truncate">
                                      {note.title || 'Untitled Note'}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    {note.favorited && (
                                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                    )}
                                    {isSelected && (
                                      <Check className="w-3.5 h-3.5 text-[#3bb360]" />
                                    )}
                                  </div>
                                </button>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 mt-2 border-t border-white/[0.06] flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsAddCourseModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9a9da3] hover:text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#3bb360]" />
                  <span>New Collection</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setCurrentView('courses');
                  }}
                  className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#9a9da3] hover:text-white text-xs font-medium transition-colors cursor-pointer"
                  title="View all collections"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>All</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Header Actions: Mode switch and Delete only (expanded to far right edge) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mode Switch: icons edit and preview icon only */}
          <EditorModeSwitch mode={editorMode} onModeChange={setEditorMode} />

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="w-8 h-8 rounded-xl text-[#9a9da3] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 flex items-center justify-center transition-all cursor-pointer active:scale-95"
            title="Delete note"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Note Title: Expands edge-to-edge, fades out in Preview mode along with the formatting symbols box */}
      <div
        aria-hidden={editorMode === 'preview'}
        className={`transition-all duration-300 ease-in-out transform origin-top shrink-0 ${
          editorMode === 'preview'
            ? 'opacity-0 -translate-y-2 max-h-0 py-0 mb-0 overflow-hidden pointer-events-none'
            : 'opacity-100 translate-y-0 max-h-24 px-4 sm:px-6 pt-3.5 pb-2 pointer-events-auto'
        }`}
      >
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
          className="w-full text-2xl sm:text-3xl font-bold tracking-tight text-[#f2f2f3] bg-transparent border-none focus:outline-none placeholder-[#6b6e73]"
        />
      </div>

      {/* Editor Toolbar Row: Expands edge-to-edge across the glass, fades when preview is enabled */}
      <div
        aria-hidden={editorMode === 'preview'}
        className={`transition-all duration-300 ease-in-out transform origin-top shrink-0 w-full ${
          editorMode === 'preview'
            ? 'opacity-0 -translate-y-2 max-h-0 mb-0 overflow-hidden pointer-events-none'
            : 'opacity-100 translate-y-0 max-h-24 pointer-events-auto'
        }`}
      >
        <EditorToolbar
          statusText={currentNote.savedStatus || 'SAVED JUST NOW'}
          onApplyFormat={handleApplyFormat}
        />
      </div>

      {/* Content Area: Stretches directly over the behind glass without nested dark boxes */}
      <div 
        key={editorMode} 
        className="animate-fade-swap flex-1 min-h-0 w-full overflow-hidden flex flex-col bg-transparent"
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
            className="w-full h-full px-4 sm:px-6 py-4 font-mono text-[13px] sm:text-sm leading-relaxed text-[#f2f2f3] bg-transparent resize-none focus:outline-none placeholder-[#6b6e73] selection:bg-[#3bb360]/30 overflow-y-auto"
            spellCheck={false}
          />
        ) : (
          <div 
            tabIndex={0} 
            aria-label="Markdown preview" 
            className="w-full h-full px-4 sm:px-6 py-5 overflow-y-auto markdown-preview focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20 bg-transparent"
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

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onAdd={(name) => {
          const newCol = addCollection(name);
          reassignNoteCollection(currentNote.id, newCol.id);
        }}
      />
    </main>
  );
};
