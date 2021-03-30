import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './js/App';

import 'bootstrap';

import './scss/main.scss';
import './scss/custom.scss';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> <App /> </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
