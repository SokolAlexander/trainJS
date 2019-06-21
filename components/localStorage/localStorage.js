(function() {
'use strict';

class LStorage {
    /**
     * saves the data to localStorage
     * @param {Object} data 
     */
    static setData(item) {
        LStorage.checkStorage();
        //LStorage.clear();
        let name = item.index + '-js-app';
        let value = '';
        for (let key in item) {
            value += `${key}:${item[key]};`
        }
        window.localStorage.setItem(name, value);
    }

    static removeData(index) {
        let name = index + '-js-app';
        window.localStorage.removeItem(name);
    }

    /**
     * gets data to display from localStorage
     * @returns {Array}
     */
    static getData() {
        LStorage.checkStorage();

        let data = [];
        for (let key in window.localStorage) {
            if (key.indexOf('-js-app') === -1) continue;
            let i = parseInt(key);
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
        }
        return data;
    }

    static checkStorage() {
        try {
            let x = '__storage_test__';
            window.localStorage.setItem(x, x);
            window.localStorage.removeItem(x);
            return;
        }
        catch(err) {
            console.error('LocalStorage unavailable: ' + err);
        }
    }

    /**
     * deletes all the enties in localStorage object
     * that were added by this app
     */
    static clear() {
        for (let key in window.localStorage) {
            if (key.indexOf('-js-app') !== -1) {
            window.localStorage.removeItem(key);
            }
        }
        console.log('Storage cleared')
    }
}

//export
window.LStorage = LStorage;
})();