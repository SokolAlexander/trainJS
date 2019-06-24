import {CustomDate} from '../customDate/customDate.js';

/**
 * class representing a form
 */
export class Form {
  /**
     * Creates a form using htmlEl
     * @param {htmlEL} htmlEl
     * @param {Array} args inputs configuration
     */
  constructor(htmlEl, ...args) {
    this.el = htmlEl;
    this.inputs = args[0];
    this._render();
    this._initEvents();
  }

  /**
     * renders the form
     */
  _render() {
    this.el.innerHTML = '';

    this.div = document.createElement('div');
    this.div.classList.add('inputs-wrap');
    this.el.appendChild(this.div);

    if (this.inputs[0]) {
      this.inputs.forEach((element) => {
        this._addInput(element);
      });
    }
  }

  /**
     * adds one input of type, adds a className
     * @param {Object} input
     */
  _addInput(input) {
    const className = 'form-input-' + input.type;

    const newInput = document.createElement('input');
    newInput.classList.add(className);

    for (const key in input) {
      newInput.setAttribute(key, input[key]);
    }

    this.div.appendChild(newInput);
  }

  /**
     * adds eventListeners
     * to stop page from refreshing on form submit
     * and for submitting form
     */
  _initEvents() {
    this.el.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitForm();
      this._dropInputs();
    });
    this.el.addEventListener('click', (e) => {
      if (e.target.classList.contains('form-input-button')) {
        this._dropFilters();
      }
    });
  }

  /**
     * dispatches custom event to submit form
     */
  _submitForm() {
    const formData = this._getFormData();

    const formSubmit = new CustomEvent('formSubmit',
        {bubbles: true, detail: formData});
    this.el.dispatchEvent(formSubmit);
  }

  /**
     * gets values of inputs
     * @return {Object} values of inputs
     */
  _getFormData() {
    const textValue = this.el.querySelector('input[type="text"]').value;
    const dateInputs = this.el.querySelectorAll('input[type="date"]');

    return {text: textValue,
      date: CustomDate.getPrettyDate(new Date(dateInputs[0].value))};
  }

  /**
   * drops inputs values
   */
  _dropInputs() {
    this.el.querySelector('input[type=text]').value = '';
  }
}
