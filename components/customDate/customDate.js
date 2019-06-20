(function() {
'use strict';
/**
 * a class for working with date
 */
class CustomDate {
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
     * @param {string} date1 in format DD-MM-YYYY
     * @param {string} date2 in format DD-MM-YYYY
     */
    static compareDates(date1, date2) {
        let day1 = parseInt(date1.substr(0, 2));
        let month1 = parseInt(date1.substr(3, 2));
        let year1 = parseInt(date1.substr(6, 4));

        let day2 = parseInt(date2.substr(0, 2));
        let month2 = parseInt(date2.substr(3, 2));
        let year2 = parseInt(date2.substr(6, 4));
        let res = true;

        if (year1 > year2) res = false
        else if (year1 === year2) {
            if (month1 > month2) res = false
            else if (month1 === month2) { 
                if (day1 > day2) res = false
            }
        }
        return res;
    }
}

//export
window.CustomDate = CustomDate;
})();