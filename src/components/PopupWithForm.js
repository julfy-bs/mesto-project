import Popup from './Popup.js';
import { EVENT, FORM, VALIDATION } from './enum.js';

export default class PopupWithForm extends Popup {
  _submitHandler;

  constructor(selector) {
    super(selector);
    this._form = document.querySelector(selector).querySelector(FORM.SELECTOR);
    this._submitter = this._form.querySelector(VALIDATION.BUTTON_SELECTOR);
    this._submitHandler = () => {
    };
  }

  getInputValue(name) {
    return this._form.elements[name].value;
  }

  fillInputs(userData) {
    this._submitter.setAttribute('disabled', 'disabled');
    this._submitter.classList.add(VALIDATION.BUTTON_DISABLED_CLASS);
    const keys = Object.keys(userData);
    keys.forEach(input => this._form.elements[input].value = userData[input]);
  }

  updateSubmitHandler(handleSubmit) {
    this._submitHandler = handleSubmit;
  }

  _addEventListeners() {
    super._addEventListeners();
    this._form.addEventListener(EVENT.SUBMIT, (e) => {
      e.preventDefault();
      this._submitHandler();
    });
  };

  resetForm() {
    this._form.reset();
  }

  close() {
    super.close();
    this._submitHandler = () => {
    };
  }
}
