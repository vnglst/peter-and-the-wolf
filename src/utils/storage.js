/* eslint no-console: 0 */

export default class Storage {
  constructor(key) {
    this.key = key;
  }

  save(obj) {
    try {
      localStorage.setItem(this.key, JSON.stringify(obj));
    } catch (error) {
      console.error('Error saving object:', obj, 'Error message:', error);
    }
  }

  load() {
    const data = localStorage.getItem(this.key);
    return JSON.parse(data);
  }

  clear() {
    localStorage.setItem(this.key, JSON.stringify({}));
  }
}
