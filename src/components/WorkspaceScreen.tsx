import React, { useState } from 'react';
import { PanelLeftOpen, FileText, ChevronRight } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { SidebarNav } from './SidebarNav';
import { NoteListPanel } from './NoteListPanel';
import { EditorPanel } from './EditorPanel';

export const WorkspaceScreen: React.FC = () => {
  const {
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isNoteListCollapsed,
    setIsNoteListCollapsed,
    currentNoteId,
    activeFilter,
    editorMode,
  } = useNotes();

  // Mobile active tab: 'collections' | 'notes' | 'editor'
  const [mobileTab, setMobileTab] = useState<'collections' | 'notes' | 'editor'>('editor');

  // Auto-advance tabs on mobile for natural hierarchical navigation
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileTab('notes');
    }
  }, [activeFilter]);

  React.useEffect(() => {
    if (currentNoteId && window.innerWidth < 768) {
      setMobileTab('editor');
    }
  }, [currentNoteId]);

  return (
    <div className="app-backdrop relative h-screen w-screen overflow-hidden p-2 sm:p-3 select-none">
      {/* Subtle grain texture overlay matching reference */}
      <div className="grain-overlay pointer-events-none absolute inset-0" />

      {/* Top Navigation: Courses | Notes | Editor aligned in clean dedicated space with original colors */}
      <div
        className={`md:hidden flex items-center justify-center pb-2 mb-1 border-b border-white/[0.06] transition-opacity duration-200 ${
          editorMode === 'preview' && mobileTab === 'editor'
            ? 'opacity-40 hover:opacity-100 focus-within:opacity-100'
            : 'opacity-100'
        }`}
      >
        <div className="flex items-center p-1 rounded-xl bg-[#14161a] border border-white/[0.06] w-full max-w-xs sm:max-w-sm mx-auto shadow-sm">
          <button
            type="button"
            onClick={() => setMobileTab('collections')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer text-center select-none active:scale-[0.98] ${
              mobileTab === 'collections'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3] hover:text-[#f2f2f3]'
            }`}
          >
            Course
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('notes')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer text-center select-none active:scale-[0.98] ${
              mobileTab === 'notes'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3] hover:text-[#f2f2f3]'
            }`}
          >
            Notes
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer text-center select-none active:scale-[0.98] ${
              mobileTab === 'editor'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3] hover:text-[#f2f2f3]'
            }`}
          >
            Editor
          </button>
        </div>
      </div>

      {/* Mobile Single Panel View */}
      <div className="md:hidden h-[calc(100vh-4.25rem)]">
        {mobileTab === 'collections' && (
          <SidebarNav />
        )}
        {mobileTab === 'notes' && (
          <NoteListPanel />
        )}
        {mobileTab === 'editor' && (
          <EditorPanel />
        )}
      </div>

      {/* Desktop / Tablet 3-Panel Grid (≥ 768px) - Editor screen increased */}
      <div 
        className="hidden md:grid h-full relative"
        style={{
          gridTemplateColumns: isSidebarCollapsed && isNoteListCollapsed
            ? '1fr'
            : isSidebarCollapsed
            ? 'minmax(280px, 22%) 1fr'
            : isNoteListCollapsed
            ? 'minmax(220px, 15%) 1fr'
            : 'minmax(210px, 14.5%) minmax(260px, 18.5%) 1fr',
          gap: 'clamp(10px, 1.4vw, 18px)',
        }}
      >
        {/* Floating reopen button if Sidebar is collapsed */}
        {isSidebarCollapsed && (
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            className="absolute top-4 left-4 z-20 w-8 h-8 rounded-xl bg-[#1a1c1f] border border-white/[0.1] text-[#9a9da3] hover:text-[#f2f2f3] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        )}

        {/* Floating reopen button if Note List is collapsed */}
        {isNoteListCollapsed && (
          <button
            onClick={() => setIsNoteListCollapsed(false)}
            className="absolute top-4 left-16 z-20 w-8 h-8 rounded-xl bg-[#1a1c1f] border border-white/[0.1] text-[#9a9da3] hover:text-[#f2f2f3] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            title="Expand note list"
            aria-label="Expand note list"
          >
            <FileText className="w-4 h-4" />
          </button>
        )}

        {/* Panel 1: Sidebar (~17.6%) */}
        {!isSidebarCollapsed && (
          <div className="h-full min-w-0 overflow-hidden">
            <SidebarNav onCollapse={() => setIsSidebarCollapsed(true)} />
          </div>
        )}

        {/* Panel 2: Note List (~23.0%) */}
        {!isNoteListCollapsed && (
          <div className="h-full min-w-0 overflow-hidden">
            <NoteListPanel onCollapse={() => setIsNoteListCollapsed(true)} />
          </div>
        )}

        {/* Panel 3: Editor (~55.0% - fills remaining space) */}
        <div className="h-full min-w-0 overflow-hidden">
          <EditorPanel />
        </div>
      </div>
    </div>
  );
};
