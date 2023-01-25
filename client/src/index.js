import React from 'react';
import ReactDOM from 'react-dom/client';
// acces aux fonctionnalitées de routage
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// style.css
import "./assets/styles/index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>
);


