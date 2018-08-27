export const appConfig = {
  AUDIO_POSITION_REFRESH_RATE: 100,
  BACKGROUND_IMAGE: 'images/kym-645714-unsplash.jpg',
};

export const englishContentKarloff = {
  SOUNDS_PATH: './sounds/english-karloff/',
  MAIN_SOUND_FILE: 'karloff-main.mp3',
  SOUND_EFFECTS: [
    { id: 'peter', label: '👦', mp3: 'peter.mp3' },
    { id: 'wolf', label: '🐺', mp3: 'wolf.mp3' },
    { id: 'bird', label: '🐦', mp3: 'bird.mp3' },
    { id: 'duck', label: '🦆', mp3: 'duck.mp3' },
    { id: 'grandfather', label: '👴', mp3: 'grandfather.mp3' },
    { id: 'cat', label: '😼', mp3: 'cat.mp3' },
    { id: 'rifleshots', label: '🔫', mp3: 'rifleshots.mp3' },
  ],
  STORAGE_KEY: 'peter-wolf-english-karloff',
};

export const dutchContentVanDijk = {
  ...englishContentKarloff,
  SOUNDS_PATH: './sounds/dutch-vandijk/',
  MAIN_SOUND_FILE: 'vandijk-main.mp3',
  STORAGE_KEY: 'peter-wolf-dutch-vandijk',
};
