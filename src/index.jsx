import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

/* eslint no-console: 0 */

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  console.log('Service Worker App loading started');
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      console.log('Service Worker App Registered');
    })
    .catch(() => {
      console.error('Error registering Service Worker');
    });
}

ReactDOM.render(<App />, document.getElementById('app'));
