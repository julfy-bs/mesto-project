import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this._image = document.querySelector(imageSelector);
    this._title = document.querySelector(titleSelector);
  }

  fill({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}
