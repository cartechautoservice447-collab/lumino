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
    <div className="app-backdrop relative h-screen w-screen overflow-hidden p-4 select-none">
      {/* Subtle grain texture overlay matching reference */}
      <div className="grain-overlay pointer-events-none absolute inset-0" />

      {/* Mobile Top Navigation (< 768px) */}
      <div className="md:hidden flex items-center justify-between pb-3 mb-1 border-b border-white/[0.06]">
        <div className="flex items-center p-1 rounded-xl bg-[#14161a] border border-white/[0.06] w-full">
          <button
            onClick={() => setMobileTab('collections')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mobileTab === 'collections'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3]'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setMobileTab('notes')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mobileTab === 'notes'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3]'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setMobileTab('editor')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mobileTab === 'editor'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3]'
            }`}
          >
            Editor
          </button>
        </div>
      </div>

      {/* Mobile Single Panel View */}
      <div className="md:hidden h-[calc(100vh-4.5rem)]">
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

      {/* Desktop / Tablet 3-Panel Grid (≥ 768px) */}
      <div 
        className="workspace-desktop-grid hidden md:grid h-full relative"
        style={{
          gridTemplateColumns: isSidebarCollapsed && isNoteListCollapsed
            ? '1fr'
            : isSidebarCollapsed
            ? 'minmax(320px, var(--lumino-notes-width)) minmax(0, 1fr)'
            : isNoteListCollapsed
            ? 'minmax(260px, var(--lumino-sidebar-width)) minmax(0, 1fr)'
            : 'minmax(260px, var(--lumino-sidebar-width)) minmax(320px, var(--lumino-notes-width)) minmax(0, 1fr)',
          gap: '18px',
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
