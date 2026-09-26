import React, { useState } from 'react';
import { FolderPlus, X } from 'lucide-react';

interface AddCourseModalProps {
  isOpen: boolean;
  onAdd: (name: string) => void;
  onClose: () => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onAdd,
  onClose,
}) => {
  const [courseName, setCourseName] = useState('');

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseName.trim()) {
      onAdd(courseName.trim());
      setCourseName('');
      onClose();
    }
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div 
        className="glass-panel animate-panel-in w-full max-w-md rounded-2xl p-6 text-left relative shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9a9da3] hover:text-[#f2f2f3] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#292a2d] border border-white/[0.06] flex items-center justify-center text-accent-green">
            <FolderPlus className="w-5 h-5 text-accent-green" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#f2f2f3]">Add New Course</h3>
            <p className="text-xs text-[#9a9da3]">Create a new folder to organize your lecture notes</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#9a9da3] mb-2">
              Course Name
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g. LECTURE 1, CS50, or Algorithms"
              autoFocus
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#14161a] border border-white/[0.08] text-sm text-[#f2f2f3] placeholder-[#6b6e73] focus:outline-none focus:border-white/[0.2] transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#f2f2f3] bg-[#292a2d] hover:bg-[#343538] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!courseName.trim()}
              className="px-4 py-2 text-xs font-medium text-white bg-accent-green hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-opacity flex items-center gap-1.5 cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
