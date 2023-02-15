import Popup from './Popup.js';
import { EVENT, FORM, POPUP } from './enum.js';

export default class PopupWithForm extends Popup {

  constructor(selector, submitHandler) {
    super(selector);
    this._form = document.querySelector(selector).document.querySelector(FORM.SELECTOR);
    this._submitHandler = submitHandler;
  }

  _addEventListeners() {
    super._addEventListeners();

  };

  close() {
    super.close();
  }
}
