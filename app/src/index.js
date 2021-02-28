import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';

import 'bootstrap';

import './scss/main.scss';
import './scss/custom.scss';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
