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
        this.formAdd = new Form(this._getNewEl('form', 'form-add'), 
                                            [{
                                                type: 'text', 
                                                value: 'text goes '
                                            },
                                            {                                                
                                                type: 'date', 
                                                value: '12-01-01'
                                            }]);
        this.formFilter = new Form(this._getNewEl('form', 'form-filter'), 
                                            [{
                                                type: 'text', 
                                                value: 'text goes here2'
                                            },
                                            {                                                
                                                type: 'date', 
                                                value: '12-01-01'
                                            },
                                            {                                                
                                                type: 'date', 
                                                value: '12-01-02'
                                            }]);

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
        this.$el.addEventListener('formSubmit', e => {

            console.log(e.target)
            if (e.target === this.formAdd.$el) {
                debugger
                this.list.addItem(e);
            } else {
                this.list.filterData(e);
            }
        });
    }
}

//export
window.App = App;
})();