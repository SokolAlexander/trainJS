(function () {
'use strict';
class App {
    /**
     * creates a js application using html element
     * @param {htmlEl} htmlEl 
     */
    constructor(htmlEl) {
        this.$el = htmlEl;

        let data = [{date: '12-05-14', text: 'asdgov', checked: false}, 
                    {date: '12-05-14', text: 'asdgov', checked: false}];
        this.list = new List(this._getNewEl('div', 'list'), data);
        this.form = new Form(this._getNewEl('form', 'form'));

        this._initEvents();
    }

    /**
     * creates, appends and returns html element with tag, adds a CSS className 
     * @param {string} tag 
     * @param {string} className
     * @returns {htmlEl}
     */
    _getNewEl(tag, className) {
        let $newEl = document.createElement(tag);
        $newEl.classList.add(className, 'js-' + className);
        this.$el.appendChild($newEl);
        return $newEl;
    }

    _initEvents() {
        this.$el.addEventListener('formSubmit', e => this.list.addItem(e));
        this.$el.addEventListener('deleteClick', e => this.list.deleteItem(e));
    }
}

//export
window.App = App;
})();