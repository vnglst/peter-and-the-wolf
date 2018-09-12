import SoundHandler from '../SoundHandler';

jest.useFakeTimers();

class MockedHowl {
  constructor({
    src,
    onplay,
    onend,
    onstop,
    onpause,
    onload,
    onloaderror,
    onseek,
    html5,
  }) {
    this.src = src;
    this.load = onload;
    this.play = onplay;
    this.pause = onpause;
    this.end = onend;
    this.stop = onstop;
    this.onseek = onseek;
    this.loaderror = onloaderror;
    this.position = 0;
    this.html5 = html5;
    setTimeout(() => {
      onload();
    }, 1000);
  }

  seek = position => {
    if (position) {
      this.position = position;
    }
    this.onseek();
    return this.position;
  };

  duration = () => 34435;
}

const config = {
  positionRefreshRate: 500,
  soundsPath: 'some/path/',
  soundsData: [
    {
      id: 'main',
      label: '🐺',
      file: 'wolf',
      html5: true,
    },
    {
      id: 'peter',
      label: '👦',
      file: 'peter',
      soundFx: true,
    },
  ],
};

describe('SoundHandler', () => {
  let soundHandler;

  beforeEach(() => {
    soundHandler = new SoundHandler({
      config,
      Howl: MockedHowl,
      onStart: jest.fn(),
      onEnd: jest.fn(),
      onStop: jest.fn(),
      onPause: jest.fn(),
      onLoad: jest.fn(),
      onMainProgress: jest.fn(),
      onSeek: jest.fn(),
    });
    soundHandler.load();
    jest.runOnlyPendingTimers();
  });

  it('sounds are loaded properly', () => {
    expect(soundHandler.soundsLoaded.main).toBeTruthy();
    expect(soundHandler.soundsLoaded.peter).toBeTruthy();
  });

  it('when sounds are loaded callbacks are executed', () => {
    expect(soundHandler.onLoad.mock.calls).toHaveLength(2);
  });

  it('when starting playback all sounds should be stopped', () => {
    soundHandler.togglePlay('peter', '');
    expect(soundHandler.onStop.mock.calls).toHaveLength(1);
  });

  it('when starting playback main shound should be pauzed', () => {
    soundHandler.togglePlay('peter', '');
    expect(soundHandler.onPause.mock.calls).toHaveLength(1);
  });

  it('should start playback if soundfx when nothing is playing', () => {
    soundHandler.togglePlay('peter', '');
    expect(soundHandler.onStart.mock.calls).toHaveLength(1);
  });

  it('should not playback if soundfx is already playing', () => {
    soundHandler.togglePlay('peter', 'peter');
    expect(soundHandler.onStart.mock.calls).toHaveLength(0);
  });

  it('should not playback if main sound is already playing', () => {
    soundHandler.togglePlay('main', 'main');
    expect(soundHandler.onStart.mock.calls).toHaveLength(0);
  });

  it('should seek to new position', () => {
    soundHandler.skipMain(10);
    expect(soundHandler.sounds.main.seek()).toEqual(10);
  });

  it('should also seek backwards', () => {
    soundHandler.skipMain(20);
    soundHandler.skipMain(-10);
    expect(soundHandler.sounds.main.seek()).toEqual(10);
  });

  it('should show progress 0 at startup', () => {
    expect(soundHandler.getMainProgressInPercent()).toEqual(0);
  });

  it('should show progress', () => {
    soundHandler.skipMain(1255);
    expect(soundHandler.getMainProgressInPercent()).toBeCloseTo(3.64);
  });
});
