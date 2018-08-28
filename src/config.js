const defaultConfig = {
  positionRefreshRate: 500,
  backgroundImage: 'images/kym-645714-unsplash.jpg',
  title: 'Peter and the Wolf',
};

export const englishKarloff = {
  ...defaultConfig,
  soundsPath: './sounds/english-karloff/',
  mainSoundFile: 'karloff-main.mp3',
  soundEffects: [
    { id: 'peter', label: '👦', mp3: 'peter.mp3' },
    { id: 'wolf', label: '🐺', mp3: 'wolf.mp3' },
    { id: 'bird', label: '🐦', mp3: 'bird.mp3' },
    { id: 'duck', label: '🦆', mp3: 'duck.mp3' },
    { id: 'grandfather', label: '👴', mp3: 'grandfather.mp3' },
    { id: 'cat', label: '😼', mp3: 'cat.mp3' },
    { id: 'rifleshots', label: '🔫', mp3: 'rifleshots.mp3' },
  ],
  storageKey: 'peter-wolf-english-karloff',
};

export const dutchVanDijk = {
  ...defaultConfig,
  ...englishKarloff,
  title: 'Peter en de Wolf',
  soundsPath: './sounds/dutch-vandijk/',
  mainSoundFile: 'vandijk-main.mp3',
  storageKey: 'peter-wolf-dutch-vandijk',
};
