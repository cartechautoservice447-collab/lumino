import React from 'react';
import { Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  noteTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  noteTitle,
  onConfirm,
  onCancel,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div 
        className="glass-panel animate-panel-in w-full max-w-md rounded-2xl p-6 text-left relative shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#9a9da3] hover:text-[#f2f2f3] transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#f2f2f3]">Delete Note</h3>
            <p className="text-xs text-[#9a9da3]">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-[#9a9da3] mb-6 leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-[#f2f2f3]">"{noteTitle || 'Untitled note'}"</span>? It will be permanently removed from your workspace.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-[#f2f2f3] bg-[#292a2d] hover:bg-[#343538] rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Note
          </button>
        </div>
      </div>
    </div>
  );
};
