import Popup from './Popup.js';
import { EVENT, FORM } from './enum.js';

export default class PopupWithForm extends Popup {
  _submitHandler;
  constructor(selector) {
    super(selector);
    this._form = document.querySelector(selector).querySelector(FORM.SELECTOR);
    this._submitHandler = () => {};
  }

  getInputValue(name) {
    return this._form.elements[name].value
  }

  fillInputs(userData) {
    const keys = Object.keys(userData);
    keys.forEach(input => this._form.elements[input].value = userData[input])
  }

  updateSubmitHandler(handleSubmit) {
    this._submitHandler = handleSubmit;
  }

  _addEventListeners() {
    super._addEventListeners();
    this._form.addEventListener(EVENT.SUBMIT, (e) => {
      e.preventDefault();
      this._submitHandler();
    })
  };

  close() {
    super.close();
    this._form.reset();
    this._submitHandler = () => {};
  }
}
