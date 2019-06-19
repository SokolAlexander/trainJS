(function () {
'use strict';

class List {
    /**
     * Creates a list using htmlEl
     * @param {htmlEL} htmlEl
     * @param {Array} data 
     */
    constructor(htmlEl, data) {
        this.$el = htmlEl;
        this.data = data;

        this._render();
        this._initEvents();
    }

    _setFullData() {
        this.fullData = [];
        this.data.forEach((el, i) => {
            this.fullData[i] = this.data[i]           
        });
    }

    /**
     * renders list of items
     */
    _render() {
        //this should be done through DOM methods?
        this.$el.innerHTML = '';
        this.table = document.createElement('table');
        this._addHeader();
        this.$el.appendChild(this.table);
        let i = 0;
        while (this.data[i]) {
            this._renderItem(this.data[i], i);
            i++;
        }
    }

    _addHeader() {
        let header = document.createElement('tr');
        header.classList.add('list-header');
        let headerDate = this._getNewTd({}, 'header-date');
        let headerText = this._getNewTd({}, 'header-text');

        headerDate.innerHTML = 'Date';
        headerText.innerHTML = 'Text';

        header.appendChild(headerDate);
        header.appendChild(headerText);

        this.table.appendChild(header);
    }

    /**
     * appends one item to the list
     * @param {obj} item 
     */
    _renderItem(item, index) {
        let $newItem = document.createElement('tr');
        $newItem.classList.add('list-item');
        if (item.checked) {
            $newItem.classList.add('list-item-checked')};

        let $itemDate = this._getNewTd(item, 'date');
        let $itemText = this._getNewTd(item, 'text');
        let $itemDelete = this._getNewTd();

        $newItem.appendChild($itemDate);
        $newItem.appendChild($itemText);
        $newItem.appendChild($itemDelete);

        $newItem.setAttribute('data-index', index);

        this.table.appendChild($newItem);
    }
    
    /**
     * returns new div with data from item and ClassName
     * @param {Obj} item 
     * @param {String} className 
     * @returns {htmlEl} $newDiv
     */
    _getNewTd(item = {}, className = 'delete') {
        let $newTd = document.createElement('td');
        $newTd.classList.add('list-item-' + className);
        if (className in item) {
            $newTd.innerHTML = item[className];
        };
        return $newTd;
    }

    /**
     * adds event listeners  on list
     */
    _initEvents() {
        this.$el.addEventListener('click', this._onClick.bind(this));
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
        } else this.checkItem(e.target);
    }

    /**
     * sorts data by text, reverses data and call render
     */
    sortDataByText() {
        this.data.sort((a, b) => {
            return a.text > b.text ? 1 : -1});
        this._render();
    }
    /**
     * sorts data by date, reverses data and calls render
     */
    sortDataByDate() {
        this.data.sort((a, b) => {
            console.log(a.date + ' ' + b.date + 'a<=b?' + CustomDate.compareDates(a.date, b.date));
           return CustomDate.compareDates(a.date, b.date) ? -1 : 1
        });
        this._render();
    }

    /**
     * filters data
     */
    filterData(e) {
        this._setFullData();
        let dateTo = e.detail.dateTo;
        let dateFrom = e.detail.dateFrom;
        let substring = e.detail.text;
        this.data = this.data.filter(item => {
            return (CustomDate.compareDates(dateFrom, item.date) &&
                    CustomDate.compareDates(item.date, dateTo))// &&
                    //item.text.indexOf(substr) !== -1)
        });
        this._render();
    }

    dropFilters() {
        this.data = this.fullData;
        this._render();
    }

    /**
     * adds new item to  data array and calls render
     * @param {CustomEvent} e 
     */
    addItem(e) {
        this.data.push(e.detail);
        this._render();
    }

    /**
     * deletes item from array and calls render
     * @param {htmlEl} item 
     */
    deleteItem(item) {
        this.data = this.data.filter((elem, i) => {
            return parseInt(item.dataset.index) !== i});
        this._render();
    }

    /**
     * Makes item checked
     * @param {htmlEl} item 
     */
    checkItem(item) {
        while (item !== this.$el) {
            if (item.classList.contains('list-item')) break;
            else item = item.parentNode;
        }
        this.data[parseInt(item.dataset.index)].checked = 
            !this.data[parseInt(item.dataset.index)].checked;
        this._render();
    }
}

//export
window.List = List;
})();