//index.js — точка входа JavaScript
//App.js — корневой компонент приложения

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
