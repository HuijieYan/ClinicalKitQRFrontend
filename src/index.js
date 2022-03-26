import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './Component/reportWebVitals';
import { CookiesProvider } from 'react-cookie';

/**
 * @file index.js This is React default start page,
 * user access the web page through router.
 * All web page documentations are in the Modules, Classes contain all components used in the web page
 * @see {@link module:Router}
 */

//This is React default start setting
ReactDOM.render(
  <CookiesProvider>
  <>
    <App />
  </>
  </CookiesProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
