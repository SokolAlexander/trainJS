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
        //not sure whether to do this from constr or before first filtering
        this.fullData = data;

        this._render();
        this._initEvents();
    }

    /**
     * renders list of items
     */
    _render() {
        //this should be done through DOM methods?
        this.$el.innerHTML = '';
        let i = 0;
        while (this.data[i]) {
            this._renderItem(this.data[i], i);
            i++;
        }
    }

    /**
     * appends one item to the list
     * @param {obj} item 
     */
    _renderItem(item, index) {
        let $newItem = document.createElement('div');
        $newItem.classList.add('list-item');
        if (item.checked) {
            $newItem.classList.add('list-item-checked')};

        let $itemDate = this._getNewDiv(item, 'date');
        let $itemText = this._getNewDiv(item, 'text');
        let $itemDelete = this._getNewDiv();

        $newItem.appendChild($itemDate);
        $newItem.appendChild($itemText);
        $newItem.appendChild($itemDelete);

        $newItem.setAttribute('data-index', index);

        this.$el.appendChild($newItem);
    }
    
    /**
     * returns new div with data from item and ClassName
     * @param {Obj} item 
     * @param {String} className 
     * @returns {htmlEl} $newDiv
     */
    _getNewDiv(item = {}, className = 'delete') {
        let $newDiv = document.createElement('div');
        $newDiv.classList.add('list-item-' + className);
        if (item[className]) {
            $newDiv.innerHTML = item[className];
        };
        return $newDiv;
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
        } else {
            this.checkItem(e.target);
        }

        
    }

    /**
     * sorts data by field, calls render
     * @param {String} field
     */
    sortDataBy(field) {
        //....
        this._render();
    }

    /**
     * filters data
     */
    filterData(e) {
        let dateTo = e.detail.dateTo;
        let dateFrom = e.detail.dateFrom;
        this.data = this.data.filter(item => {
            return (CustomDate.compareDates(dateFrom, item.date) &&
                    CustomDate.compareDates(item.date, dateTo))
        });
        this._render();
    }

    /**
     * adds new item to  data array and calls render
     * @param {CustomEvent} e 
     */
    addItem(e) {
        e.detail.date = CustomDate.getPrettyDate(new Date(e.detail.date));
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