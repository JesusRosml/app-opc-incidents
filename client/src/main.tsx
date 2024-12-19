import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppIncidents } from './AppIncidents'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppIncidents />
  </StrictMode>,
)
