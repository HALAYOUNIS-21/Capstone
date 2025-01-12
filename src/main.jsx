import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // ✅ Import BrowserRouter

import './Styles/index.css';  // Base Tailwind CSS file
import './Styles/Styles.css';


import App from './App.jsx';  // Main App component

// ✅ Render the app with BrowserRouter
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);