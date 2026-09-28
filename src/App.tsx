/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NotesProvider, useNotes } from './context/NotesContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { CourseFoldersScreen } from './components/CourseFoldersScreen';
import { WorkspaceScreen } from './components/WorkspaceScreen';

function MainRouter() {
  const { currentView } = useNotes();

  if (currentView === 'courses') {
    return <CourseFoldersScreen />;
  }

  return <WorkspaceScreen />;
}

export default function App() {
  return (
    <CustomizationProvider>
      <NotesProvider>
        <MainRouter />
      </NotesProvider>
    </CustomizationProvider>
  );
}
