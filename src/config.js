export const appConfig = {
  AUDIO_POSITION_REFRESH_RATE: 100,
  BACKGROUND_IMAGE: 'images/kym-645714-unsplash.jpg',
};

export const englishContentKarloff = {
  SOUND_TRACK_URL: './english-karloff/karloff-main.mp3',
  SOUND_FXS_PATH: './english-karloff/',
  STORAGE_KEY: 'peter-wolf-english-karloff',
  SOUND_EFFECTS: [
    { id: 'peter', label: '👦', mp3: 'peter.mp3' },
    { id: 'wolf', label: '🐺', mp3: 'wolf.mp3' },
    { id: 'bird', label: '🐦', mp3: 'bird.mp3' },
    { id: 'duck', label: '🦆', mp3: 'duck.mp3' },
    { id: 'grandfather', label: '👴', mp3: 'grandfather.mp3' },
    { id: 'cat', label: '😼', mp3: 'cat.mp3' },
    { id: 'rifleshots', label: '🔫', mp3: 'rifleshots.mp3' },
  ],
};

export const dutchContentVanDijk = {
  ...englishContentKarloff,
  SOUND_TRACK_URL: './dutch-vandijk/vandijk-main.mp3',
  SOUND_FXS_PATH: './dutch-vandijk/',
  STORAGE_KEY: 'peter-wolf-dutch-vandijk',
};
