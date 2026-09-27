import React, { useState } from 'react';
import { 
  PanelLeftClose, 
  ArrowLeft, 
  Plus, 
  Search, 
  Layers, 
  Star, 
  Folder, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { AddCourseModal } from './modals/AddCourseModal';
import { SettingsModal } from './modals/SettingsModal';

interface SidebarNavProps {
  onCollapse?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ onCollapse }) => {
  const {
    user,
    collections,
    activeFilter,
    setActiveFilter,
    setCurrentView,
    addNote,
    addCollection,
    searchQuery,
    setSearchQuery,
    totalNotesCount,
    favoritesCount,
    getCollectionNoteCount,
  } = useNotes();

  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <aside 
      aria-label="Main Navigation"
      className="glass-panel animate-panel-in h-full p-[22px] flex flex-col justify-between select-none shadow-xl overflow-hidden"
    >
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Lockup + Collapse Button */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#9a9da3] leading-none">
              GLASS
            </span>
            <span className="text-xl font-bold tracking-tight text-[#f2f2f3] leading-tight">
              Notes
            </span>
          </div>

          <button
            onClick={onCollapse}
            className="lumino-icon-button text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.05] flex items-center justify-center transition-colors"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Back to All Courses Link */}
        <button
          onClick={() => setCurrentView('courses')}
          className="w-full h-11 flex items-center gap-2 px-4 rounded-xl border border-white/[0.06] bg-white/[0.035] text-sm font-medium text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.06] mb-3 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>All Courses</span>
        </button>

        {/* "+ New Note" Full-width Green Button with pulse-glow and scale hover */}
        <button
          onClick={() => addNote()}
          style={{ backgroundColor: '#3bb360' }}
          className="animate-pulse-glow lumino-primary-action w-full px-4 bg-[#3bb360] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] mb-3 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Note</span>
        </button>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6e73]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setSearchQuery('')}
            placeholder="Search notes"
            className="w-full h-11 pl-10 pr-8 rounded-xl bg-[#14161a] border border-white/[0.06] text-sm text-[#f2f2f3] placeholder-[#6b6e73] focus:outline-none focus:border-white/[0.16] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6b6e73] hover:text-[#f2f2f3] p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Primary Nav Rows */}
        <div className="space-y-0.5 mb-5">
          {/* All Notes */}
          <button
            onClick={() => setActiveFilter('all')}
            className={`w-full h-11 flex items-center justify-between px-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#9a9da3]" />
              <span>All Notes</span>
            </div>
            <span className="font-mono text-[11px] text-[#6b6e73]">{totalNotesCount}</span>
          </button>

          {/* Favorites */}
          <button
            onClick={() => setActiveFilter('favorites')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeFilter === 'favorites'
                ? 'bg-[#292a2d] text-[#f2f2f3]'
                : 'text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Star className="w-4 h-4 text-[#9a9da3]" />
              <span>Favorites</span>
            </div>
            <span className="font-mono text-[11px] text-[#6b6e73]">{favoritesCount}</span>
          </button>
        </div>

        {/* COLLECTIONS Section */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6b6e73]">
              COLLECTIONS
            </span>
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="w-6 h-6 rounded-lg hover:bg-white/[0.06] text-[#9a9da3] hover:text-[#f2f2f3] flex items-center justify-center transition-colors"
              title="Add collection"
              aria-label="Add collection"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Collections List */}
          <div className="overflow-y-auto space-y-0.5 flex-1 pr-1 -mr-1">
            {collections.map((col) => {
              const count = getCollectionNoteCount(col.id);
              const isSelected = activeFilter === col.id;

              return (
                <button
                  key={col.id}
                  onClick={() => setActiveFilter(col.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#292a2d] text-[#f2f2f3]'
                      : 'text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Folder 
                      className="w-4 h-4 text-[#3bb360] shrink-0" 
                      style={{ color: '#3bb360', stroke: '#3bb360' }} 
                      strokeWidth={2} 
                    />
                    <span className="truncate">{col.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#6b6e73] shrink-0 ml-2">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Pinned: Settings & User Panel */}
      <div className="pt-3 border-t border-white/[0.06] space-y-2 shrink-0">
        {/* Settings row */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="w-full h-11 flex items-center gap-2.5 px-3 rounded-xl text-sm font-medium text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.04] transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4 text-[#9a9da3]" />
          <span>Settings</span>
        </button>

        {/* User panel */}
        <div className="h-16 flex items-center justify-between p-2.5 rounded-2xl bg-[#14161a] border border-white/[0.05]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#292a2d] text-[#f2f2f3] font-semibold flex items-center justify-center text-xs shrink-0 border border-white/[0.06]">
              {user.avatarLetter}
            </div>
            <div className="min-w-0 flex flex-col text-left">
              <span className="text-xs font-semibold text-[#f2f2f3] truncate leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-[#6b6e73] truncate leading-tight font-mono">
                {user.email.length > 16 ? user.email.slice(0, 15) + '…' : user.email}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="w-9 h-9 flex items-center justify-center text-[#6b6e73] hover:text-[#f2f2f3] p-1.5 rounded-xl hover:bg-white/[0.04] transition-colors shrink-0"
            title="Sign out / Account"
            aria-label="Sign out / Account"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onAdd={(name) => addCollection(name)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </aside>
  );
};
