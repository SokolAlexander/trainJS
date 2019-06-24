/**
 * class for working with localStorage
 */
export class LStorage {
  /**
     * saves the data to localStorage
     * @param {Object} item
     */
  static setData(item) {
    LStorage.checkStorage();
    // LStorage.clear();
    const name = item.index + '-js-app';
    let value = '';
    for (const key in item) {
      value += `${key}:${item[key]};`;
    }
    window.localStorage.setItem(name, value);
  }

  /**
   * removes an item from localStorage
   * @param {number} index 
   */
  static removeData(index) {
    const name = index + '-js-app';
    window.localStorage.removeItem(name);
  }

  /**
     * gets data to display from localStorage
     * @return {Array}
     */
  static getData() {
    LStorage.checkStorage();

    const data = [];
    let i = 0;
    for (const key in window.localStorage) {
      if (key.indexOf('-js-app') === -1) continue;

      data[i] = {};
      let start = 0;
      let dd = window.localStorage[key].indexOf(':', start);
      let pause = window.localStorage[key].indexOf(';', start);

      while (dd !== -1) {
        data[i][window.localStorage[key].slice(start, dd)] =
                        window.localStorage[key].slice(dd+1, pause);

        start = pause + 1;
        dd = window.localStorage[key].indexOf(':', start);
        pause = window.localStorage[key].indexOf(';', start);
      }
      i++;
    }
    return data;
  }

  /**
   * checks if localStorage is available
   */
  static checkStorage() {
    try {
      const x = '__storage_test__';
      window.localStorage.setItem(x, x);
      window.localStorage.removeItem(x);
      return;
    } catch (err) {
      console.error('LocalStorage unavailable: ' + err);
    }
  }

  /**
     * deletes all the enties in localStorage object
     * that were added by this app
     */
  static clear() {
    for (const key in window.localStorage) {
      if (key.indexOf('-js-app') !== -1) {
        window.localStorage.removeItem(key);
      }
    }
    console.log('Storage cleared');
  }
}
