(function () {
'use strict';


class Form {
    /**
     * Creates a form using htmlEl
     * @param {htmlEL} htmlEl 
     */
    constructor(htmlEl) {
        this.$el = htmlEl;
        console.log('form created');
    }
}

//export
window.Form = Form;
})();