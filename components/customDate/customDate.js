(function() {
'use strict';
/**
 * a class for working with date
 */
class CustomDate {
    constructor() {
    }

    /**
     * get date in format dd.mm.yyyy
     * @param {Date} date 
     */
    static getPrettyDate(date = new Date) {
        let day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
        let month = date.getMonth() > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
        return day + '.' + month + '.' + date.getFullYear();
    }

    static getDateForForm(date = new Date) {
        let day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
        let month = date.getMonth() > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
        return date.getFullYear() + '-' + month + '-' +  day;
    }

    /**
     * returns  true if date1 <= date2, false otherwise
     * @param {Date} date1 
     * @param {Date} date2 
     */
    static compareDates(date1, date2) {
        date1 = new Date(date1);
        date2 = new Date(date2);
        let res = date1.getFullYear() > date2.getFullYear() ? false :
                  date1.getMonth() > date2.getMonth() ? false :
                  date1.getDate() > date2.getDate() ? false : true;
        return res;
    }
}

//export
window.CustomDate = CustomDate;
})();