const defaultConfig = {
  positionRefreshRate: 500,
  backgroundImage: 'images/kym-645714-unsplash.jpg',
  title: 'Peter and the Wolf',
};

export const englishKarloff = {
  ...defaultConfig,
  soundsPath: './sounds/english-karloff/',
  soundsData: [
    { id: 'peter', label: '👦', mp3: 'peter.mp3', soundFx: true },
    { id: 'wolf', label: '🐺', mp3: 'wolf.mp3', soundFx: true },
    { id: 'bird', label: '🐦', mp3: 'bird.mp3', soundFx: true },
    { id: 'duck', label: '🦆', mp3: 'duck.mp3', soundFx: true },
    { id: 'grandfather', label: '👴', mp3: 'grandfather.mp3', soundFx: true },
    { id: 'cat', label: '😼', mp3: 'cat.mp3', soundFx: true },
    { id: 'rifleshots', label: '🔫', mp3: 'rifleshots.mp3', soundFx: true },
    {
      id: 'main',
      label: '',
      mp3: 'karloff-main.mp3',
      html5: true,
    },
  ],
  storageKey: 'peter-wolf-english-karloff',
};

export const dutchVanDijk = {
  ...defaultConfig,
  ...englishKarloff,
  title: 'Peter en de Wolf',
  soundsPath: './sounds/dutch-vandijk/',
  storageKey: 'peter-wolf-dutch-vandijk',
};
