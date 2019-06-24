import {CustomDate} from '../customDate/customDate.js';
import {Form} from './form.js';

export class FormFilter extends Form {
    constructor(htmlEl, ...args) {
        super(htmlEl, ...args);
    }

    _getFormData() {
        let textValue = this.el.querySelector('input[type="text"]').value;
        let dateInputs = this.el.querySelectorAll('input[type="date"]');
        return {
            text: textValue,
            dateFrom: CustomDate.getPrettyDate(new Date(dateInputs[0].value)),
            dateTo: CustomDate.getPrettyDate(new Date(dateInputs[1].value))
        }
    }

    
    /**
     * adds eventListeners 
     * to stop page from refreshing on form submit
     * and for submitting form
     */
    _initEvents() {
        let inputText = this.el.querySelector('input[type=text]');
        inputText.addEventListener('input', e => 
            {this._submitTextFilter();
            console.log(e);
            });

        this.el.addEventListener('submit', e => {
            e.preventDefault();
            this._dropInputs();
            this._submitForm()});
        this.el.addEventListener('click', e => {
            if (e.target.classList.contains('form-input-button')) {
                this._dropFilters();
            }
        })
    }

    _submitTextFilter() {
        let formData = this._getFormData();
        console.log('ok');
        let textFilterSubmit = new CustomEvent('textFilterSubmit', {bubbles: true, detail: formData});
        this.el.dispatchEvent(textFilterSubmit);
    }

    /**
     * dispatches  custom Event to drop filters
     */
    _dropFilters() {
        let dropFilters = new CustomEvent('dropFilters', {bubbles: true});
        this.el.dispatchEvent(dropFilters);
    }
}