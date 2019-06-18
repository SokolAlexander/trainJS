(function () {
'use strict';


class Form {
    /**
     * Creates a form using htmlEl
     * @param {htmlEL} htmlEl 
     */
    constructor(htmlEl) {
        this.$el = htmlEl;
        this._render();
        this._initEvents();
    }

    /**
     * renders the form
     */
    _render() {
        this._addInput('text', 'form-input-text', 'text goes here');
        this._addInput('date','form-input-date', '2012-01-10');
        this._addInput('submit', 'form-input-button', 'Добавить');
    }

    /**
     * adds one input of type, adds a className
     * @param {String} type
     * @param {String} ClassName
     * @param {String} Value
     */
    _addInput(type, className, value) {
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
        let dateValue = this.$el.querySelector('input[type="date"]').value;

        return {text: textValue, date: dateValue}
    }
}

//export
window.Form = Form;
})();