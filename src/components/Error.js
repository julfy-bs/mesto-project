import { ERROR, EVENT } from './enum.js';

export default class Error {
  constructor({ code, body }) {
    this._templateElement = document.querySelector(ERROR.TEMPLATE).content.querySelector(ERROR.SELECTOR);
    this._wrapperElement = document.querySelector(ERROR.WRAPPER);
    this.code = code;
    this.body = body;
  }

  _addErrorActiveClass(errorElement) {
    errorElement.classList.add(ERROR.ACTIVE_CLASS);
    this._wrapperElement.classList.add('error_active');
  }

  _removeErrorActiveClass(errorElement) {
    errorElement.classList.remove(ERROR.ACTIVE_CLASS);
    this._wrapperElement.classList.remove('error_active');
  };

  _closeButtonListener = (element) => {
    this._removeErrorActiveClass(element);
    setTimeout(() => element.remove(), 500);
  };

  createError() {
    const errorItem = this._templateElement.cloneNode(true);
    const errorItemTitle = errorItem.querySelector(ERROR.TITLE);
    const errorItemBody = errorItem.querySelector(ERROR.DESCRIPTION);
    const errorItemButton = errorItem.querySelector(ERROR.BUTTON);
    this._addErrorActiveClass(errorItem);
    errorItemButton.addEventListener(EVENT.CLICK, () => this._closeButtonListener(errorItem));
    errorItemTitle.textContent = `Код ${this.code}`;
    errorItemBody.textContent = this.body;
    setTimeout(() => this._closeButtonListener(errorItem), 5000)
    return errorItem;
  }
}

