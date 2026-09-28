import React, { createContext, useContext, useState, useEffect } from 'react';
import { Collection, Note, UserProfile, EditorMode, ViewScreen, ActiveFilterType } from '../types';
import { INITIAL_COLLECTIONS, INITIAL_NOTES, INITIAL_USER } from '../data/seedData';

interface NotesContextType {
  user: UserProfile;
  collections: Collection[];
  notes: Note[];
  currentView: ViewScreen;
  activeFilter: ActiveFilterType;
  currentNoteId: string | null;
  searchQuery: string;
  editorMode: EditorMode;
  isSidebarCollapsed: boolean;
  isNoteListCollapsed: boolean;
  isFullscreenEditor: boolean;
  
  // Computed values
  totalNotesCount: number;
  favoritesCount: number;
  filteredNotes: Note[];
  currentNote: Note | null;
  currentCollection: Collection | null;

  // Actions
  setCurrentView: (view: ViewScreen) => void;
  setActiveFilter: (filter: ActiveFilterType) => void;
  setCurrentNoteId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setEditorMode: (mode: EditorMode) => void;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  setIsNoteListCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  setIsFullscreenEditor: (fullscreen: boolean | ((prev: boolean) => boolean)) => void;
  
  // Note actions
  addNote: (collectionId?: string) => string;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleFavorite: (id: string) => void;
  reassignNoteCollection: (noteId: string, newCollectionId: string) => void;

  // Collection actions
  addCollection: (name: string) => Collection;
  selectCollection: (collectionId: string) => void;
  getCollectionNoteCount: (collectionId: string) => number;
  getCollectionFooterText: (collectionId: string) => string;
  
  // Reset
  resetToDemoData: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const STORAGE_KEY_COLLECTIONS = 'lumina_glass_notes_collections';
const STORAGE_KEY_NOTES = 'lumina_glass_notes_notes';

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<UserProfile>(INITIAL_USER);

  // Initialize collections from localStorage or seed
  const [collections, setCollections] = useState<Collection[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLLECTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load collections from localStorage', e);
    }
    return INITIAL_COLLECTIONS;
  });

  // Initialize notes from localStorage or seed
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load notes from localStorage', e);
    }
    return INITIAL_NOTES;
  });

  const [currentView, setCurrentView] = useState<ViewScreen>('courses');
  const [activeFilter, setActiveFilter] = useState<ActiveFilterType>('col-lecture-0');
  const [currentNoteId, setCurrentNoteId] = useState<string | null>('note-arguments');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editorMode, setEditorMode] = useState<EditorMode>('write');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isNoteListCollapsed, setIsNoteListCollapsed] = useState<boolean>(false);
  const [isFullscreenEditor, setIsFullscreenEditor] = useState<boolean>(false);

  // Persist collections
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COLLECTIONS, JSON.stringify(collections));
    } catch (e) {
      console.error('Failed to save collections to localStorage', e);
    }
  }, [collections]);

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes to localStorage', e);
    }
  }, [notes]);

  // Derived counts
  const totalNotesCount = notes.length;
  const favoritesCount = notes.filter((n) => n.favorited).length;

  const getCollectionNoteCount = (collectionId: string) => {
    return notes.filter((n) => n.collectionId === collectionId).length;
  };

  const getCollectionFooterText = (collectionId: string) => {
    const colNotes = notes.filter((n) => n.collectionId === collectionId);
    const count = colNotes.length;
    if (count === 0) {
      return 'No notes yet';
    }

    const col = collections.find((c) => c.id === collectionId);
    if (col?.lastEditedText && col.lastEditedText !== 'No notes yet') {
      const clean = col.lastEditedText.startsWith('Last edited ')
        ? col.lastEditedText
        : `Last edited ${col.lastEditedText}`;
      return clean;
    }

    // Find latest note's date
    const sorted = [...colNotes].sort((a, b) => b.updatedAt - a.updatedAt);
    const latest = sorted[0];
    if (latest?.metaDateText) {
      return `Last edited ${latest.metaDateText.toLowerCase()}`;
    }

    return 'Last edited recently';
  };

  // Filtered notes based on active filter and search query
  const filteredNotes = notes.filter((note) => {
    // Collection or view filter
    let matchesFilter = true;
    if (activeFilter === 'all') {
      matchesFilter = true;
    } else if (activeFilter === 'favorites') {
      matchesFilter = note.favorited;
    } else {
      matchesFilter = note.collectionId === activeFilter;
    }

    if (!matchesFilter) return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = note.title.toLowerCase().includes(q);
      const inBody = note.body.toLowerCase().includes(q);
      return inTitle || inBody;
    }

    return true;
  });

  // Current active note
  const currentNote = notes.find((n) => n.id === currentNoteId) || null;

  // Current collection object (if filtering by a specific collection)
  const currentCollection = collections.find((c) => c.id === activeFilter) || null;

  // Add Note
  const addNote = (targetCollectionId?: string): string => {
    const colId = targetCollectionId || (activeFilter !== 'all' && activeFilter !== 'favorites' ? activeFilter : collections[0]?.id || 'col-lecture-0');
    
    const newNoteId = 'note-' + Date.now();
    const newNote: Note = {
      id: newNoteId,
      collectionId: colId,
      title: 'Untitled note',
      body: '',
      favorited: false,
      metaDateText: 'JUST NOW',
      savedStatus: 'SAVED JUST NOW',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setCurrentNoteId(newNoteId);
    
    // Switch to that collection view if currently in another collection or courses
    if (activeFilter !== 'all' && activeFilter !== 'favorites' && activeFilter !== colId) {
      setActiveFilter(colId);
    }
    setCurrentView('workspace');

    return newNoteId;
  };

  // Update Note
  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id !== id) return note;
        return {
          ...note,
          ...updates,
          updatedAt: Date.now(),
          savedStatus: updates.savedStatus || 'SAVED JUST NOW',
        };
      })
    );
  };

  // Delete Note
  const deleteNote = (id: string) => {
    setNotes((prev) => {
      const updated = prev.filter((note) => note.id !== id);
      if (currentNoteId === id) {
        // Select next available note
        const remainingInView = updated.filter((n) => {
          if (activeFilter === 'all') return true;
          if (activeFilter === 'favorites') return n.favorited;
          return n.collectionId === activeFilter;
        });
        setCurrentNoteId(remainingInView.length > 0 ? remainingInView[0].id : null);
      }
      return updated;
    });
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id !== id) return note;
        return {
          ...note,
          favorited: !note.favorited,
        };
      })
    );
  };

  // Reassign note collection
  const reassignNoteCollection = (noteId: string, newCollectionId: string) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id !== noteId) return note;
        return {
          ...note,
          collectionId: newCollectionId,
        };
      })
    );
    if (activeFilter !== 'all' && activeFilter !== 'favorites') {
      setActiveFilter(newCollectionId);
    }
  };

  // Add collection
  const addCollection = (name: string): Collection => {
    const newCollection: Collection = {
      id: 'col-' + Date.now(),
      name: name.trim() || 'New Course',
      tag: 'GENERAL',
      lastEditedText: 'No notes yet',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setCollections((prev) => [...prev, newCollection]);
    setActiveFilter(newCollection.id);
    setCurrentView('workspace');
    return newCollection;
  };

  // Select collection and navigate to workspace
  const selectCollection = (collectionId: string) => {
    setActiveFilter(collectionId);
    setCurrentView('workspace');
    // Select first note in collection if available
    const firstInCol = notes.find((n) => n.collectionId === collectionId);
    if (firstInCol) {
      setCurrentNoteId(firstInCol.id);
    } else {
      setCurrentNoteId(null);
    }
  };

  // Reset demo
  const resetToDemoData = () => {
    setCollections(INITIAL_COLLECTIONS);
    setNotes(INITIAL_NOTES);
    setActiveFilter('col-lecture-0');
    setCurrentNoteId('note-arguments');
    setCurrentView('courses');
    setSearchQuery('');
    setEditorMode('write');
    localStorage.removeItem(STORAGE_KEY_COLLECTIONS);
    localStorage.removeItem(STORAGE_KEY_NOTES);
  };

  return (
    <NotesContext.Provider
      value={{
        user,
        collections,
        notes,
        currentView,
        activeFilter,
        currentNoteId,
        searchQuery,
        editorMode,
        isSidebarCollapsed,
        isNoteListCollapsed,
        isFullscreenEditor,
        totalNotesCount,
        favoritesCount,
        filteredNotes,
        currentNote,
        currentCollection,
        setCurrentView,
        setActiveFilter,
        setCurrentNoteId,
        setSearchQuery,
        setEditorMode,
        setIsSidebarCollapsed,
        setIsNoteListCollapsed,
        setIsFullscreenEditor,
        addNote,
        updateNote,
        deleteNote,
        toggleFavorite,
        reassignNoteCollection,
        addCollection,
        selectCollection,
        getCollectionNoteCount,
        getCollectionFooterText,
        resetToDemoData,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
