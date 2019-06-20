(function() {
'use strict';

class LStorage {
    static setData(data) {
        let dataToStore = data.map((elem, i) => {
            let res = '';
            for (let key in elem) {
                res += key + ':' + elem[key] + ';';
            }
            return res;
        });       
        dataToStore.forEach((elem, i) => {
            i += '-js-app';
            window.localStorage.setItem(i, elem);
        });
    }

    static getData() {
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

    static removeData(data) {
        data.foreach(elem => {
            for (let key in elem) {
                window.localStorage.removeItem(key);
            }
        })
            
    }

    static checkStorage() {
        try {
            let storage = window.localStorage;
            let x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e
        }
    }

    static clear() {
        for (let key in window.localStorage) {
            //console.log(window.localStorage[key])
            window.localStorage.removeItem(key);
        }
        console.log('Storage cleared')
    }
}

//export
window.LStorage = LStorage;
})();