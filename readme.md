# Peter and the Wolf PWA

My second attempt at a Progressive Web App (with Safari iOS in mind). The idea was to create an audio player, with some fun sound buttons around Prokofiev's symphonic fairy tale for children "Peter and the Wolf". The app was to be kids friendly, fun to use and also introduce kids to the story and music of Prokofiev. The result can be found here:

![screenshot app](https://raw.githubusercontent.com/vnglst/peter-and-the-wolf/master/screenshot.png 'https://peter-and-the-wolf.netlify.com')

It turned out that making large audio files available offline using Service Workers was more challenging than I expected. My initial thought was to download all the audio on registration of the service worker. But that lead to several problems: service worker registration could fail if downloads hadn't fully completed, but also bad performance of the app at startup. And that was on Chrome, I don't even want to go into Safari on iOS. In the end I think the combination of web audio (with all it's workarounds) and service workers, is not a happy one.

My current implementation of the service workers loads and caches all the app shell files (js, css, html, etc.) on startup. The mp3's are cached when those are requested by the app. This works pretty well for the short sound files, but not for the large audio file. That one only works when an internet connection is available and the audio can be streamed. Maybe I will come back to this app and topic sometime in the future.

## Under the hood:

- `howler.js` - audio (especially the old audio web element) is still full of unpleasant suprises. Especially on Safari. At first I tried to work around all those myself, but I should have started a library much earlier. Howler seems to work pretty well. No using it for the sound fragments (soundfx) yet. Still have to refactor that bit.
- `material-ui-icon` - I really wish treeshaking would be better supported. Now I'm stuck with all of `@material-ui/core` even though I'm only using four svg icons. I will extract those latter to optimize the build size.
- For the Service Workers I'm using the webpack plugin `sw-precache-webpack-plugin`, which is a Webpack wrapper around the standard `sw-precache` plugin.
- and the standard libraries like `React`, `webpack`, `babel`, etc.

## PWA

- Generate favicons & app icons: https://realfavicongenerator.net/
- Generate splash screens iOS: https://appsco.pe/developer/splash-screens (android is automatic, watch out for big images)

## Credits

- Moon Photo by Kym on Unsplash: https://unsplash.com/photos/egw9NNjuXDY
- Dutch version "Peter en de Wolf" by Ko van Dijk, source: https://www.youtube.com/watch?v=7dw9wyZ18wY
- English version narrated by Boris Karloff, source: https://www.youtube.com/watch?v=IB66bInIXAY&t=107s
