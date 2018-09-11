/* eslint no-console: 0 */

import preventDoubleTapZoom from 'prevent-double-tap-zoom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { dutchVanDijk, englishKarloff } from './config';
import './styles/sanitize.css';
import './styles/index.css';

let config = englishKarloff;
const getBrowserLanguage = () => navigator.language;
const language = getBrowserLanguage();
if (language && language.startsWith('nl')) {
  config = dutchVanDijk;
}

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

ReactDOM.render(<App config={config} />, document.getElementById('app'));
