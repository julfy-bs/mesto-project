import { EVENT } from './enum.js';

export default class Profile {
  constructor({ nameSelector, occupationSelector, avatarSelector, avatarButtonSelector, editButtonSelector, addCardButtonSelector }) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileAboutElement = document.querySelector(occupationSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
    this._profileAvatarParentElement = document.querySelector(avatarButtonSelector);
    this._profileEditButton = document.querySelector(editButtonSelector);
    this._profileAddCardButton = document.querySelector(addCardButtonSelector);
  }

  addAvatarListener(handleAvatarElementClick) {
    this._profileAvatarParentElement.addEventListener(EVENT.CLICK, () => {
      handleAvatarElementClick();
    });
  }

  addEditButtonListener(handleEditButtonClick) {
    this._profileEditButton.addEventListener(EVENT.CLICK, () => {
      handleEditButtonClick();
    });
  }

  addNewCardButtonListener(handleAddCardButtonClick) {
    this._profileAddCardButton.addEventListener(EVENT.CLICK, () => {
      handleAddCardButtonClick();
    });
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent,
      avatar: this._profileAvatarElement.src,
      id: this._userId
    };
  }

  setUserInfo(userData) {
    const { name, about, avatar, id } = userData;
    if (name) this._profileNameElement.textContent = name;
    if (about) this._profileAboutElement.textContent = about;
    if (avatar) this._profileAvatarElement.src = avatar;
    if (id) this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
