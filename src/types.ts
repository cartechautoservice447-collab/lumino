<<<<<<< HEAD
export interface Note {
  id: string;
  title: string;
  body: string;
  favorite: boolean;
  collectionId: string | null;
=======
export interface Collection {
  id: string;
  name: string;
  tag: string;
  lastEditedText: string;
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
  createdAt: number;
  updatedAt: number;
}

<<<<<<< HEAD
export interface Collection {
  id: string;
  name: string;
  category?: string;
  parentId?: string | null;
}

export type FilterState =
  | { kind: 'all' }
  | { kind: 'favorites' }
  | { kind: 'collection'; id: string };

export type ThemeMode = 'original' | 'dark' | 'light';
export type GlassPreset = 'low' | 'medium' | 'high' | 'ultra' | 'custom';
export type MotionPreset = 'low' | 'medium' | 'high' | 'ultra';
export type UIFont = 'inter' | 'system' | 'mono';

export interface CustomizationSettings {
  theme: ThemeMode;
  glassPreset: GlassPreset;
  glassBlur: number;
  glassOpacity: number;
  glassThickness: number;
  motion: MotionPreset;
  uiFont: UIFont;
  uiFontSize: number;
  uiLineHeight: number;
  editorFontSize: number;
  editorLineHeight: number;
  liquidGlassEnabled: boolean;
  liquidDensity: number;
  liquidTransparency: number;
  liquidClearness: number;
  liquidGel: number;
  liquidBounce: number;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    username?: string;
    full_name?: string;
  };
=======
export interface Note {
  id: string;
  collectionId: string;
  title: string;
  body: string;
  favorited: boolean;
  metaDateText: string;
  savedStatus: string;
  createdAt: number;
  updatedAt: number;
}

export type EditorMode = 'write' | 'preview';

export type ActiveFilterType = 'all' | 'favorites' | string; // collectionId

export type ViewScreen = 'courses' | 'workspace';

export interface UserProfile {
  name: string;
  email: string;
  avatarLetter: string;
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
}
