/**
 * a class for working with date
 */
export class CustomDate {
  /**
     * get date in format dd.mm.yyyy
     * @param {Date} date
     * @return {String}
     */
  static getPrettyDate(date = new Date) {
    const day = date.getDate() > 9 ? date.getDate() :
        '0' + date.getDate();
    const month = date.getMonth() > 9 ? date.getMonth()+1 :
        '0' + (date.getMonth() + 1);
    return day + '.' + month + '.' + date.getFullYear();
  }

  /**
     * get date in YYYY-MM-DD
     * @param {Date} date
     * @return {String}
     */
  static getDateForForm(date = new Date) {
    const day = date.getDate() > 9 ? date.getDate() :
        '0' + date.getDate();
    const month = date.getMonth() > 9 ? date.getMonth() + 1 :
        '0' + (date.getMonth() + 1);
    return date.getFullYear() + '-' + month + '-' + day;
  }

  /**
     * returns  true if date1 <= date2, false otherwise
     * @param {string} date1 in format DD-MM-YYYY
     * @param {string} date2 in format DD-MM-YYYY
     * @return {boolean}
     */
  static compareDates(date1, date2) {
    return date1.split('.').reverse().join('') <=
        date2.split('.').reverse().join('');
  }
}
