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

        this.render();
        this._initEvents();
        console.log('list created');
    }

    /**
     * renders list of items
     */
    render() {
        let i = 0;
        debugger
        while (this.data[i]) {
            this._renderItem(this.data[i]);
            i++;
        }
    }

    /**
     * appends items to the list
     * @param {obj} item 
     */
    _renderItem(item) {
        let $newItem = document.createElement('div');
        $newItem.classList.add('list-item');

        let $itemDate = document.createElement('div');
        $itemDate.classList.add('list-item-date');
        $itemDate.innerHTML = item.date;

        let $itemText = document.createElement('div');
        $itemText.classList.add('list-item-text');
        $itemText.innerHTML = item.text;

        let $itemDelete = document.createElement('div');
        $itemDelete.classList.add('list-item-delete');

        $newItem.appendChild($itemDate);
        $newItem.appendChild($itemText);
        $newItem.appendChild($itemDelete);
        this.$el.appendChild($newItem)
    }

    _initEvents() {

    }
}

//export
window.List = List;
})();