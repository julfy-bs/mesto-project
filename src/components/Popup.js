import { EVENT, POPUP } from './enum.js';

export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  _handleMouseEvent(e) {
    const closeCondition = e.target.classList.contains(POPUP.CLASSNAME)
      || e.target.classList.contains(POPUP.CLOSE_CLASSNAME);
    if (closeCondition) this.close();
  };

  _handleKeyboardEvent(e) {
    if (e.key === 'Escape') this.close();
  };

  _addEventListeners() {
    this._popup.addEventListener(EVENT.MOUSEDOWN, (e) => this._handleMouseEvent(e));
    this._popup.addEventListener(EVENT.KEYDOWN, (e) => this._handleKeyboardEvent(e));
  };

  _removeEventListeners() {
    this._popup.removeEventListener(EVENT.MOUSEDOWN, this._handleMouseEvent);
    this._popup.removeEventListener(EVENT.KEYDOWN, this._handleKeyboardEvent);
  }

  open() {
    this._popup.classList.add(POPUP.ACTIVE_CLASS);
    this._addEventListeners();
    setTimeout(() => this._popup.focus(), POPUP.ANIMATION_DURATION);
  }

  close() {
    this._popup.classList.remove(POPUP.ACTIVE_CLASS);
    this._removeEventListeners();
  }
}
