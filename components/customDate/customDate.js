/**
 * a class for working with date
 */
export class CustomDate {
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
        let day1 = date1.substr(0, 2);
        let month1 = date1.substr(3, 2);
        let year1 = date1.substr(6, 4);
        date1 = year1 + month1 + day1;

        let day2 = date2.substr(0, 2);
        let month2 = date2.substr(3, 2);
        let year2 = date2.substr(6, 4);
        date2 = year2 + month2 + day2;

        return date1 <= date2;
    }
}