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

    _onClick(e) {
        console.log('ok');
        if (e.target.classList.contains('list-item-delete')) {
            this._deleteItem(e.target.parentNode);
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
    filterData() {

    }

    /**
     * adds new item to  data array and calls render
     * @param {CustomEvent} e 
     */
    addItem(e) {
        this.data.push(e.detail);
        this._render();
    }

    _deleteItem(item) {
        this.data = this.data.filter((elem, i) => {
            return parseInt(item.dataset.index) !== i});
        this._render();
        console.log(this.data)
    }
}

//export
window.List = List;
})();