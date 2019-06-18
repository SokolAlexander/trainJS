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
    static getFormattedDate(date = new Date) {
        let day = date.getDate() > 9 ? date.getDate() : '0'+date.getDate();
        let month = date.getMonth() > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
        return day + '.' + month + '.' + date.getFullYear();
    }

    /**
     * returns  true if date1 <= date2, false otherwise
     * @param {*} date1 
     * @param {*} date2 
     */
    static compareDates(date1, date2) {
        return new Date(date1).getMilliseconds() <= new Date(date2).getMilliseconds();
    }
}

//export
window.CustomDate = CustomDate;
})();