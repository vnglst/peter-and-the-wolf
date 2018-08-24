import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* eslint no-console: 0 */

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  console.log('Service Worker registration started');
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      console.log('Service Worker registration successful');
    })
    .catch(() => {
      console.error('Error registering Service Worker');
    });
}

ReactDOM.render(<App />, document.getElementById('app'));
