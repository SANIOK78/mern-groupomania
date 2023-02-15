import React from 'react';
import ReactDOM from 'react-dom/client';
// acces aux fonctionnalitées de routage
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// "Provider" => partager les infos depuis store
import { Provider } from 'react-redux';
// Import "store"
import store from './redux/store';

// style.css
import "./assets/styles/index.scss"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </Provider>
);


