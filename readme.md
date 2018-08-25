# Peter and the Wolf PWA

## Credits

Based upon this starter kit: https://github.com/HashemKhalifa/webpack-react-boilerplate
Moon Photo by Kym on Unsplash

## Under the hood:

- `howler.js` - I'm never gonna try to do Web Audio for Safari again
- `material-ui-icon` - I really wish treeshaking would be better supported, all this manually extracting the svg you need is driving me crazy (same for howler above)

TODOs:

- ~~add all the friggin icons to manifest~~
- ~~add splash screens~~
- ~~optimize all images png/jpg~~
- ~~prevent doubletap zoom~~
- ~~add sanatize css~~
- ~~disable text selection elements~~
- ~~move sw-cache to webpack plugin (test)~~
- show progress bar + ball
- save current playback progress to localstorage
- also use howler.js for soundfx
- refactor all sound logic in separate class (with tests!)
- refactor all sound React state logic to separate component
- sound button should be disabled (loading state) if not yet loaded or errored
- ~~refactor playback logic~~
- add Dutch mp3's
- find timecodes of chapters (first Dutch)
- skip to next chapter
- add better quality (and really free) English mp3
- ~~stop soundfx playback when starting main playback~~
- write this readme about PWA
- fix a11y issues
- optimize for lighthouse score
- use SVG instead of Material-UI icons to decrease bundle size by at least 110Kb
- only import functions I need from howler.js (or wait for proper treeshaking support?)

## PWA

- Best website to generate favicons & app icons: https://realfavicongenerator.net/
- Beste website to generate splash screens iOS: https://appsco.pe/developer/splash-screens (android automatic, watch out for big images)
