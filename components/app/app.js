(function () {
'use strict';
class App {
    /**
     * creates a js application using html element
     * @param {htmlEl} htmlEl 
     */
    constructor(htmlEl) {
        this.$el = htmlEl;

        this.data = [{date: '12-05-14', text: 'asdgov'}];
        this.form = new Form(this._getNewDiv('form'));
        this.list = new List(this._getNewDiv('list'), this.data);
    }

    /**
     * creates, appends and returns div 
     * @param {string} CSSCllassName
     * @returns {htmlEl} $formEl
     */
    _getNewDiv(CSSCllass) {
        let $newEl = document.createElement('div');
        $newEl.classList.add(CSSCllass, 'js-' + CSSCllass);
        this.$el.appendChild($newEl);
        return $newEl;
    }
}

//export
window.App = App;
})();