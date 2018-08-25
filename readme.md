Based upon this starter kit: https://github.com/HashemKhalifa/webpack-react-boilerplate

Moon Photo by Kym on Unsplash

Under the hood:

- `howler.js` - I'm never gonna try to do Web Audio for Safari again
- `material-ui-icon` - I really wish treeshaking would be better supported, all this manually extracting the svg you need is driving me crazy (same for howler above)

TODOs:

- sound button should be disabled (loading state) if not yet loaded
- ~~refactor playback logic~~
- skip to next chapter (find proper timecodes)
- add Dutch mp3's
- add better quality (and really free) English mp3
- save current playback progress to localstorage
- show progress bar + ball
- ~~stop soundfx playback when starting main playback~~
- prevent doubletap zoom
- add sanatize css
- disable text selection elements
- add all the friggin icons to manifest
- add splash screens
- move sw-cache to webpack plugin (test)
- write this readme about game + PWA
- fix a11y issues
- optimize for lighthouse score
- use SVG instead of Material-UI icons to decrease bundle size by at least 110Kb
