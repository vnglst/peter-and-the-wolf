import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* eslint no-console: 0 */

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  console.log('Service Worker App loading started');
  navigator.serviceWorker
    .register('/sw.js')
    .then(reg => {
      console.log('ServiceWorker registration successful with reg: ', reg);
      navigator.serviceWorker.addEventListener('message', event => {
        console.log('message from SW : ', event.data.percentage);
        console.log('message from SW : ', event.data.done);
        // TODO: update DOM to show the percentage. Replace this with
        // DOM manipulation per your liking.
      });
    })
    .catch(() => {
      console.error('Error registering Service Worker');
    });
}

ReactDOM.render(<App />, document.getElementById('app'));
