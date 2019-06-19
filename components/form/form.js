(function () {
'use strict';


class Form {
    /**
     * Creates a form using htmlEl
     * @param {htmlEL} htmlEl 
     */
    constructor(htmlEl, ...args) {
        this.$el = htmlEl;
        this.inputs = args;
        this._render();
        this._initEvents();
    }

    /**
     * renders the form
     */
    _render() {
        this.$el.innerHTML = '';
        if (this.inputs[0]) {
        this.inputs[0].forEach(element => {
            this._addInput(element.type, element.value, element.label);
        });
        }
        this._addInput('submit', 'Добавить');
    }

    /**
     * adds one input of type, adds a className
     * @param {String} type
     * @param {String} value
     */
    _addInput(type, value) {
        let className = 'form-input-' + type;
        let $newInput = document.createElement('input');
        $newInput.setAttribute('type', type);
        $newInput.classList.add(className);
        $newInput.value = value;
        $newInput.setAttribute('required', true);
        this.$el.appendChild($newInput);
    }

    /**
     * adds eventListener to stop page from refreshing on form submit
     */
    _initEvents() {
        this.$el.addEventListener('submit', e => {
            e.preventDefault();
            this._submitForm()})
    }

    /**
     * dispatches custom event to submit form
     */
    _submitForm() {
        let formData = this._getFormData();
        let formSubmit = new CustomEvent('formSubmit', {bubbles: true, detail: formData});
        this.$el.dispatchEvent(formSubmit);
    }

    /**
     * gets values of inputs
     */
    _getFormData() {
        let textValue = this.$el.querySelector('input[type="text"]').value;
        let dateInputs = this.$el.querySelectorAll('input[type="date"]');

        if (!dateInputs[1]) return {text: textValue, 
                                    date: CustomDate.getPrettyDate(new Date(dateInputs[0].value))}
        return {
            text: textValue,
            dateFrom: CustomDate.getPrettyDate(new Date(dateInputs[0].value)),
            dateTo: CustomDate.getPrettyDate(new Date(dateInputs[1].value))
        }
    }
}

//export
window.Form = Form;
})();