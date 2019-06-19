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

    /**
     * get date in YYYY-MM-DD
     * @param {Date} date 
     */
    static getDateForForm(date = new Date) {
        let day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
        let month = date.getMonth() > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
        return date.getFullYear() + '-' + month + '-' +  day;
    }

    /**
     * returns  true if date1 <= date2, false otherwise
     * @param {string} date1 
     * @param {string} date2 
     */
    static compareDates(date1, date2) {
        let day1 = parseInt(date1.substr(0, 2));
        let month1 = parseInt(date1.substr(3, 2));
        let year1 = parseInt(date1.substr(6, 4));

        let day2 = parseInt(date2.substr(0, 2));
        let month2 = parseInt(date2.substr(3, 2));
        let year2 = parseInt(date2.substr(6, 4));

        let res = year1 > year2 ? false :
                  month1 > month2 ? false :
                  day1 > day2 ? false : true;
        return res;
    }
}

//export
window.CustomDate = CustomDate;
})();