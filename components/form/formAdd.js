import {Form} from './form.js';

/**
 * class represent a form to add items
 */
export class FormAdd extends Form {
    /**
     * create a form
     * @param {htmlEl} htmlEl 
     * @param  {...any} args 
     */
  constructor(htmlEl, ...args) {
    super(htmlEl, ...args);
  }
}
