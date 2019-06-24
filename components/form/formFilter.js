import {CustomDate} from '../customDate/customDate.js';
import {Form} from './form.js';

/**
 * class representing a form to filter items
 */
export class FormFilter extends Form {
  /**
   * creates a form
   * @param {htmlEl} htmlEl
   * @param  {...any} args
   */
  constructor(htmlEl, ...args) {
    super(htmlEl, ...args);
  }

  /**
   * gets inputs values
   * @return {object} InputValues
   */
  _getFormData() {
    const textValue = this.el.querySelector('input[type="text"]').value;
    const dateInputs = this.el.querySelectorAll('input[type="date"]');
    return {
      text: textValue,
      dateFrom: CustomDate.getPrettyDate(new Date(dateInputs[0].value)),
      dateTo: CustomDate.getPrettyDate(new Date(dateInputs[1].value)),
    };
  }


  /**
     * adds eventListeners
     * to stop page from refreshing on form submit
     * and for submitting form
     */
  _initEvents() {
    const inputText = this.el.querySelector('input[type=text]');
    inputText.addEventListener('input', (e) => {
      this._submitTextFilter();
      console.log(e);
    });

    this.el.addEventListener('submit', (e) => {
      e.preventDefault();
      this._dropInputs();
      this._submitForm();
    });
    this.el.addEventListener('click', (e) => {
      if (e.target.classList.contains('form-input-button')) {
        this._dropFilters();
      }
    });
  }

  /**
   * dispatches event to submit text filter
   */
  _submitTextFilter() {
    const formData = this._getFormData();
    console.log('ok');
    const textFilterSubmit = new CustomEvent('textFilterSubmit',
        {bubbles: true, detail: formData});
    this.el.dispatchEvent(textFilterSubmit);
  }

  /**
     * dispatches  custom Event to drop filters
     */
  _dropFilters() {
    const dropFilters = new CustomEvent('dropFilters', {bubbles: true});
    this.el.dispatchEvent(dropFilters);
  }
}
