import Storage from '../Storage';

describe('localStorage', () => {
  let storage;

  beforeEach(() => {
    storage = new Storage('test');
    storage.clear();
  });

  it('is initialized properly', () => {
    expect(storage.load()).toEqual({});
  });

  it('should save data', () => {
    storage.save({ data: 'hello' });
    expect(storage.load()).toEqual({ data: 'hello' });
  });
});
