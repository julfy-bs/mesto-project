import { LOADER } from './enum.js';

export default class Loader {
  constructor(selector, [...textElements], [...imageElements]) {
    this._loader = document.querySelector(selector);
    this._textElements = document.querySelectorAll(textElements);
    this._imageElements = document.querySelectorAll(imageElements);
  }

  _showSpinner() {
    this._loader.classList.add(LOADER.ACTIVE_CLASS);
  }

  _hideSpinner() {
    this._loader.classList.remove(LOADER.ACTIVE_CLASS);
  }

  _addImageEffect() {
    this._imageElements.forEach(element => {
      element.classList.add(LOADER.SKELETON);
    });
  }

  _removeImageEffect() {
    this._imageElements.forEach(element => {
      element.classList.remove(LOADER.SKELETON);
    });
  }

  _addTextEffect() {
    this._textElements.forEach(element => {
      element.classList.add(LOADER.SKELETON);
      element.classList.add(LOADER.SKELETON_TEXT);
    });
  }

  _removeTextEffect() {
    this._textElements.forEach(element => {
      element.classList.remove(LOADER.SKELETON);
      element.classList.remove(LOADER.SKELETON_TEXT);
    });
  }

  startLoader() {
    this._addTextEffect();
    this._addImageEffect();
    this._showSpinner();
  }

  endLoader() {
    this._removeTextEffect();
    this._removeImageEffect();
    this._hideSpinner();
  }
}
