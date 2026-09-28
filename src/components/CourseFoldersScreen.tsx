import React, { useState } from 'react';
import { Settings, LogOut, Plus } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { CourseFolderCard } from './CourseFolderCard';
import { AddCourseModal } from './modals/AddCourseModal';
import { SettingsModal } from './modals/SettingsModal';

export const CourseFoldersScreen: React.FC = () => {
  const {
    user,
    collections,
    getCollectionNoteCount,
    getCollectionFooterText,
    selectCollection,
    addCollection,
  } = useNotes();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  return (
    <main className="app-backdrop relative min-h-screen w-full overflow-x-hidden text-[#f2f2f3] py-8 sm:py-10 lg:py-12 px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-start">
      {/* Subtle grain texture overlay matching reference */}
      <div className="grain-overlay pointer-events-none absolute inset-0" />

      {/* Centered container with max-width: 1536px (max-w-screen-2xl) producing 192px margins at 1920px width */}
      <div className="relative w-full max-w-[1536px] max-w-screen-2xl mx-auto space-y-6 sm:space-y-8">
        {/* Full-width Welcome Banner Glass Card with animate-panel-in */}
        <header className="glass-panel animate-panel-in flex flex-wrap items-center justify-between gap-4 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f2f2f3]">
              Welcome Back, {user.name}!
            </h1>
            <p className="text-sm sm:text-base text-[#9a9da3]">
              Select a course folder to access your workspace
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center">
            {/* Gear Settings Button */}
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="w-10 h-10 rounded-xl border border-white/5 bg-white/[0.04] flex items-center justify-center text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.08] transition-colors cursor-pointer"
              title="Settings"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Sign Out / Export Button */}
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="w-10 h-10 rounded-xl border border-white/5 bg-white/[0.04] flex items-center justify-center text-[#9a9da3] hover:text-[#f2f2f3] hover:bg-white/[0.08] transition-colors cursor-pointer"
              title="Account & Sign out"
              aria-label="Account & Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Section Label & "+ Add New Course" Button */}
        <section aria-labelledby="course-folders-title">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2
              id="course-folders-title"
              className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9a9da3]"
            >
              COURSE FOLDERS
            </h2>

            {/* Button styled using exact #3bb360 token and reference hover scale */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-[#3bb360] text-white text-xs font-medium flex items-center gap-1.5 shadow-sm cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.99]"
              style={{ backgroundColor: '#3bb360' }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Course</span>
            </button>
          </div>

          {/* Grid of Course Cards with gap-12 (3rem / 48px) matching ~3% container width */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {collections.map((collection, index) => (
              <CourseFolderCard
                key={collection.id}
                collection={collection}
                noteCount={getCollectionNoteCount(collection.id)}
                footerText={getCollectionFooterText(collection.id)}
                index={index}
                onClick={() => selectCollection(collection.id)}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(name) => {
          addCollection(name);
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </main>
  );
};
