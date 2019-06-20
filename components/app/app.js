(function () {
'use strict';
class App {
    /**
     * creates a js application using html element
     * @param {htmlEl} htmlEl 
     */
    constructor(htmlEl) {
        this.$el = htmlEl;

        let data = [{date: '12.05.2014', text: 'asdgov', checked: 1}, 
                     {date: '12.05.2015', text: 'a', checked: ''}];
        LStorage.setData(data);
        let today = CustomDate.getDateForForm();
        data = LStorage.getData();
        //LStorage.clear();
 
        this.formAdd = new Form(this._getNewEl('form', 'form-add'), 
                                            [{
                                                type: 'text', 
                                                placeholder: 'text goes ',
                                                required: 'true'
                                            },
                                            {                                                
                                                type: 'date', 
                                                value: today,
                                                required: 'true'
                                            },
                                            {                                                
                                                type: 'submit', 
                                                value: 'Добавить'
                                            }]);
        this.list = new List(this._getNewEl('div', 'list'), data);
        this.formFilter = new Form(this._getNewEl('form', 'form-filter'), 
                                            [{
                                                type: 'text', 
                                                placeholder: 'text goes here2'
                                            },
                                            {                                                
                                                type: 'date', 
                                                value: today
                                            },
                                            {                                                
                                                type: 'date', 
                                                value: today
                                            },
                                            {                                                
                                                type: 'submit', 
                                                value: 'Отфильтровать'
                                            },
                                            {                                                
                                                type: 'button', 
                                                value: 'Сбросить'
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
            if (e.target === this.formAdd.$el) {
                this.list.addItem(e);
            } else {
                this.list.filterData(e);
            }
        });

        this.$el.addEventListener('dropFilters', e => {
            this.list.dropFilters();
        });
    }
}

//export
window.App = App;
})();