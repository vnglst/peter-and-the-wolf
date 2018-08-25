import React from 'react';
import preventDoubleTapZoom from 'prevent-double-tap-zoom';
import ReactDOM from 'react-dom';
import App from './App';
import 'sanitize.css';
import './Global.css';

/* eslint no-console: 0 */

preventDoubleTapZoom({ delay: 500 });

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
