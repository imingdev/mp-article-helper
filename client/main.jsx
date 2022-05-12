import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import App from './App';

const container = document.getElementById('app-main');
createRoot(container).render(<App />);
