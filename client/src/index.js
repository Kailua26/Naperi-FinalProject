import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import AppRouter from './AppRouter';  
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />    
  </React.StrictMode>
);

reportWebVitals();
