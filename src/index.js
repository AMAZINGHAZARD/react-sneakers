import React from 'react';
import ReactDOM from 'react-dom/client';
import './index';
import App from './App';
import 'macro-css';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <App />
    </BrowserRouter>
  
);
