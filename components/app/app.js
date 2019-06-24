import {List} from '../list/list.js';
//import {Form} from '../form/form.js';
import {FormAdd} from '../form/formAdd.js';
import {FormFilter} from '../form/formFilter.js';
import {LStorage} from '../localStorage/localStorage.js';
import {CustomDate} from '../customDate/customDate.js';

/**
 * Class defining an application for to-do list
 */
export class App {
  /**
     * creates a js application using html element
     * @param {htmlEl} htmlEl
     */
  constructor(htmlEl) {
    this.el = htmlEl;
    const data = LStorage.getData();
    const today = CustomDate.getDateForForm();

    // let data = [];

    const formAddProps = [{
      type: 'text',
      required: 'true',
      placeholder: 'Добавить',
    },
    {
      type: 'date',
      value: today,
      required: 'true',
    },
    {
      type: 'submit',
      value: 'Добавить',
    }];

    const formFilterProps = [{
      type: 'text',
      placeholder: 'Поиск по тексту',
    },
    {
      type: 'date',
      value: today,
    },
    {
      type: 'date',
      value: today,
    },
    {
      type: 'submit',
      value: 'Отфильтровать',
    },
    {
      type: 'button',
      value: 'Сбросить',
    }];

    this.formAdd = new FormAdd(this._getNewEl('form', 'form-add'), formAddProps);
    this.list = new List(this._getNewEl('div', 'list'), data);
    this.formFilter = new FormFilter(this._getNewEl('form', 'form-filter'),
        formFilterProps);

    this._initEvents();
  }

  /**
     * creates, appends and returns html element with tag, adds a CSS className
     * @param {string} tag
     * @param {string} className
     * @return {htmlEl} new element
     */
  _getNewEl(tag, className) {
    const newEl = document.createElement(tag);
    newEl.classList.add(className, 'js-' + className);
    this.el.appendChild(newEl);
    return newEl;
  }

  /**
     * initialise event listeners for adding item,
     * filtering items, dropping filters, saviing data
     */
  _initEvents() {
    this.el.addEventListener('formSubmit', e => {
      if (e.target === this.formAdd.el) {
        this.list.addItem(e);
      } else {
        this.list.filterData(e);
      }
    });

    this.el.addEventListener('textFilterSubmit', e => {
      this.list.filterByText(e);
    });

    this.el.addEventListener('dropFilters', e => {
      this.list.dropFilters();
    });
  }
}
