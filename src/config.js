const defaultConfig = {
  positionRefreshRate: 500,
  backgroundImage: 'images/kym-645714-unsplash.jpg',
  title: 'Peter and the Wolf',
};

export const englishKarloff = {
  ...defaultConfig,
  soundsPath: 'sounds/english-karloff/',
  soundsData: [
    {
      id: 'peter',
      label: '👦',
      file: 'peter',
      soundFx: true,
    },
    {
      id: 'wolf',
      label: '🐺',
      file: 'wolf',
      soundFx: true,
    },
    {
      id: 'bird',
      label: '🐦',
      file: 'bird',
      soundFx: true,
    },
    {
      id: 'duck',
      label: '🦆',
      file: 'duck',
      soundFx: true,
    },
    {
      id: 'grandfather',
      label: '👴',
      file: 'grandfather',
      soundFx: true,
    },
    {
      id: 'cat',
      label: '😼',
      file: 'cat',
      soundFx: true,
    },
    {
      id: 'rifleshots',
      label: '🔫',
      file: 'rifleshots',
      soundFx: true,
    },
    {
      id: 'main',
      label: '',
      file: 'main',
      html5: true,
    },
  ],
  storageKey: 'peter-wolf-english-karloff',
};

export const dutchVanDijk = {
  ...defaultConfig,
  ...englishKarloff,
  title: 'Peter en de Wolf',
  soundsPath: 'sounds/dutch-vandijk/',
  storageKey: 'peter-wolf-dutch-vandijk',
};
