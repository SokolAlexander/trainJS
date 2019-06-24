import {CustomDate} from '../customDate/customDate.js';
import {LStorage} from '../localStorage/localStorage.js';

/**
 * class representing a list of items
 */
export class List {
  /**
     * Creates a list using htmlEl
     * @param {htmlEL} htmlEl
     * @param {Array} data
     */
  constructor(htmlEl, data) {
    this.el = htmlEl;
    this.data = data;
    this._setFullData();
    this.isSortedByDate = false;
    this.isSortedByText = false;

    this._render();
    this._initEvents();
  }

  /**
     * saves all the data to restore it after filtering
     */
  _setFullData() {
    this.fullData = [];
    this.data.forEach((el, i) => {
      this.fullData[i] = this.data[i];
    });
  }

  /**
     * renders list of items
     */
  _render() {
    // this should be done through DOM methods?
    this.el.innerHTML = '';
    this.table = document.createElement('table');
    this._addHeader();
    this.el.appendChild(this.table);
    let i = 0;
    while (this.data[i]) {
      this._renderItem(this.data[i], i);
      i++;
    }
  }

  /**
     * adds header for the table
     */
  _addHeader() {
    const header = document.createElement('tr');
    header.classList.add('list-header');
    const headerCheck = this._getNewTd({}, 'header-check');
    const headerDate = this._getNewTd({}, 'header-date');
    const headerText = this._getNewTd({}, 'header-text');
    const headerDelete = this._getNewTd({}, 'header-delete');

    headerDate.innerHTML = 'Date';
    headerText.innerHTML = 'Text';

    header.appendChild(headerCheck);
    header.appendChild(headerDate);
    header.appendChild(headerText);
    header.appendChild(headerDelete);

    this.table.appendChild(header);
  }

  /**
     * appends one item to the list
     * @param {Object} item
     * @param {number} index
     */
  _renderItem(item) {
    const newItem = document.createElement('tr');
    newItem.classList.add('list-item');
    if (item.checked) {
      newItem.classList.add('list-item-checked');
    };

    const itemCheck = this._getNewTd(item, 'check');
    const itemDate = this._getNewTd(item, 'date');
    const itemText = this._getNewTd(item, 'text');
    const itemDelete = this._getNewTd();

    newItem.appendChild(itemCheck);
    newItem.appendChild(itemDate);
    newItem.appendChild(itemText);
    newItem.appendChild(itemDelete);

    newItem.setAttribute('data-index', item.index);

    this.table.appendChild(newItem);
  }

  /**
     * returns new div with data from item and ClassName
     * @param {Obj} item
     * @param {String} className
     * @return {htmlEl} newDiv
     */
  _getNewTd(item = {}, className = 'delete') {
    const newTd = document.createElement('td');
    newTd.classList.add('list-item-' + className);
    if (className in item) {
      newTd.innerHTML = item[className];
    };
    return newTd;
  }

  /**
     * adds event listeners  on list
     */
  _initEvents() {
    this.el.addEventListener('click', this._onClick.bind(this));
  }

  /**
     * click
     * @param {event} e
     */
  _onClick(e) {
    if (e.target.classList.contains('list-item-delete')) {
      this.deleteItem(e.target.parentNode);
    } else if (e.target.classList.contains('list-item-header-date')) {
      this.sortDataByDate();
    } else if (e.target.classList.contains('list-item-header-text')) {
      this.sortDataByText();
    } else if (e.target.classList.contains('list-item-check')) {
      this.checkItem(e.target.parentNode);
    }
  }

  /**
     * sorts data by text or reverses data and calls render
     */
  sortDataByText() {
    if (this.isSortedByText) {
      this.data.reverse();
      this._render();
      return;
    };
    this.data.sort((a, b) => {
      return a.text > b.text ? 1 : -1;
    });
    this.isSortedByText = true;
    this.isSortedByDate = false;
    this._render();
  }
  /**
     * sorts data by date or reverses data and calls render
     */
  sortDataByDate() {
    if (this.isSortedByDate) {
      this.data.reverse();
      this._render();
      return;
    };
    this.data.sort((a, b) => {
      return CustomDate.compareDates(a.date, b.date) ? -1 : 1;
    });
    this.isSortedByDate = true;
    this.isSortedByText = false;
    this._render();
  }

  /**
     * filters data by date
     * @param {EventObj} e
     */
  filterData(e) {
    const {dateFrom, dateTo} =
        this._checkDates(e.detail.dateFrom, e.detail.dateTo);
    this._filterByDate(dateFrom, dateTo);
    this._render();
  }

  /**
   * filters data by text
   * @param {EventObj} e
   */
  filterByText(e) {
    if (!e.detail.data) this.data = this.fullData;
    this.data = this.data.filter((item) => {
      return (item.text.indexOf(e.detail.text) !== -1);
    });
    this._render();
  }

  /**
   * filters  data by date
   * @param {string} dateForm
   * @param {string} dateTo
   */
  _filterByDate(dateForm, dateTo) {
    this.data = this.data.filter((item) => {
      return (CustomDate.compareDates(dateFrom, item.date) &&
                    CustomDate.compareDates(item.date, dateTo));
    });
  }

  /**
     * Checks if  dateFrom < dateTo, swaps them otherwise
     * @param {string} dateFrom
     * @param {string} dateTo
     * @return {string, string}
     */
  _checkDates(dateFrom, dateTo) {
    if (!CustomDate.compareDates(dateFrom, dateTo)) {
      const buffer = dateFrom;
      dateFrom = dateTo;
      dateTo = buffer;
    }
    return {dateFrom, dateTo};
  }

  /**
     * drops filters annd calls render
     */
  dropFilters() {
    this.data = this.fullData;
    this._render();
  }

  /**
     * adds new item to  data array and calls render
     * @param {CustomEvent} e
     */
  addItem(e) {
    const newItem = e.detail;
    newItem.index = this._getItemIndex();
    this.data.push(newItem);
    this.fullData.push(newItem);
    console.log(this.data);
    this.isSortedByDate = false;
    this.isSortedByText = false;

    LStorage.setData(newItem);

    this._render();
  }

  /**
   * gets index for new item
   * @return {number} maxIndex
   */
  _getItemIndex() {
    let maxIndex = 0;
    this.fullData.forEach((elem) => {
      if (parseInt(elem.index) >= maxIndex) maxIndex = parseInt(elem.index) + 1;
    });
    return maxIndex;
  }

  /**
     * deletes item from array and calls render
     * @param {htmlEl} item
     */
  deleteItem(item) {
    this.data = this.data.filter((elem) => {
      return parseInt(item.dataset.index) !== parseInt(elem.index);
    });

    LStorage.removeData(parseInt(item.dataset.index));
    this._setFullData();
    this._render();
  }

  /**
     * Makes item checked
     * @param {htmlEl} item
     */
  checkItem(item) {
    this.data.forEach((elem) => {
      if (parseInt(elem.index) === parseInt(item.dataset.index)) {
        elem.checked = elem.checked ? '' : 1;
        LStorage.setData(elem);
      }
    });

    this._setFullData();
    this._render();
  }
}
