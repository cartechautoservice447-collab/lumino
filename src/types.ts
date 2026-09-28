export interface Collection {
  id: string;
  name: string;
  tag: string;
  lastEditedText: string;
  createdAt: number;
  updatedAt: number;
}

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
}
