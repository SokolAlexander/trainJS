(function () {
'use strict';
class App {
    /**
     * creates a js application using html element
     * @param {htmlEl} htmlEl 
     */
    constructor(htmlEl) {
        this.$el = htmlEl;

        let today = CustomDate.getDateForForm();
        let data = LStorage.getData();

        let formAddProps = [{
                            type: 'text', 
                            placeholder: 'Добавить',
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
                        }];

        let formFilterProps = [{
                                    type: 'text', 
                                    placeholder: 'Поиск по тексту'
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
                                }];
 
        this.formAdd = new Form(this._getNewEl('form', 'form-add'), formAddProps);
        this.list = new List(this._getNewEl('div', 'list'), data);
        this.formFilter = new Form(this._getNewEl('form', 'form-filter'), formFilterProps);

        this._initEvents();
    }

    /**
     * creates, appends and returns html element with tag, adds a CSS className 
     * @param {string} tag 
     * @param {string} className
     * @returns {htmlEl} new element
     */
    _getNewEl(tag, className) {
        let $newEl = document.createElement(tag);
        $newEl.classList.add(className, 'js-' + className);
        this.$el.appendChild($newEl);
        return $newEl;
    }

    /**
     * initialise event listeners for adding item, 
     * filtering items, dropping filters, saviing data
     */
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