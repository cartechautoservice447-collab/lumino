/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NotesProvider, useNotes } from './context/NotesContext';
import { CourseFoldersScreen } from './components/CourseFoldersScreen';
import { WorkspaceScreen } from './components/WorkspaceScreen';
import { EngineSettingsProvider } from './context/EngineSettingsContext';

function MainRouter() {
  const { currentView } = useNotes();

  if (currentView === 'courses') {
    return <CourseFoldersScreen />;
  }

  return <WorkspaceScreen />;
}

export default function App() {
  return (
    <EngineSettingsProvider>
      <NotesProvider>
        <MainRouter />
      </NotesProvider>
    </EngineSettingsProvider>
  );
}
