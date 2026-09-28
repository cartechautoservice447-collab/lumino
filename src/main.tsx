<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomizationProvider } from './context/CustomizationContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CustomizationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CustomizationProvider>
  </React.StrictMode>
=======
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
>>>>>>> 22f2e308992eebb1fc66e8f86c64370be20257e0
);
