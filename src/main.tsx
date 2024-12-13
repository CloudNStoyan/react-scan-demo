import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { scan } from 'react-scan';

import { App } from './App';

import './main.css';
import './styles.scss';

const rootElement = document.getElementById('root')!;

scan({
  enabled: true,
  log: true,
});

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
