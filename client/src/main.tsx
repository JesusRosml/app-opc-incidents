import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppIncidents } from './AppIncidents';
import { BrowserRouter } from 'react-router';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppIncidents />
    </BrowserRouter>
  </StrictMode>,
);
