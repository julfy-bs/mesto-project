import { CARD, EVENT } from './enum.js';

export default class Card {
  constructor(
    {
      selector,
      card: { name, link, owner, likes, id },
      userId,
      handleLikeBtnClick,
      handleDeleteBtnClick,
      handleImageClick
    }
  ) {
    this._owner = owner;
    this._likes = likes;
    this._name = name;
    this._link = link;
    this._id = id;
    this._userId = userId;
    this._handleLikeBtnClick = handleLikeBtnClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleImageClick = handleImageClick;
    this._cardTemplate = document.querySelector(selector).content.querySelector(CARD.ITEM);
    this._cardItem = this._cardTemplate.cloneNode(true);
    this._cardArticle = this._cardItem.querySelector(CARD.ARTICLE);
    this._cardImage = this._cardArticle.querySelector(CARD.IMAGE);
    this._cardTitle = this._cardArticle.querySelector(CARD.TITLE);
    this._cardLikeNumber = this._cardArticle.querySelector(CARD.LIKE_NUMBER);
    this._cardLikeButton = this._cardArticle.querySelector(CARD.LIKE_BUTTON);
    this._cardDelete = this._cardArticle.querySelector(CARD.DELETE);
  }

  _setCardContent() {
    this._cardTitle.textContent = this._name;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._name);
  }

  toggleLike(card) {
    this._likes = card.likes;
    this.updateOwnersLike();
    this._setLikesQuantity();
    this._toggleLikesClass();
  };

  _setLikesQuantity() {
    switch (this._likes.length) {
      case 0:
        this._cardLikeButton.classList.remove(CARD.LIKE_BUTTON_IS_LIKED);
        this._cardLikeNumber.textContent = '';
        break;
      default:
        this._cardLikeButton.classList.add(CARD.LIKE_BUTTON_IS_LIKED);
        this._cardLikeNumber.textContent = this._likes.length;
        break;
    }
  };

  updateOwnersLike() {
    this._hasOwnerLike = this._likes.some((like) => like._id === this._userId);
    return this._likes.some((like) => like._id === this._userId);
  };

  getData() {
    return {
      name: this._name,
      link: this._link,
      owner: this._owner,
      likes: this._likes,
      id: this._id,
      hasOwnerLike: this._hasOwnerLike
    };
  }

  remove() {
    this._cardItem.remove();
  }

  generate() {
    this._hasOwnerLike = this.updateOwnersLike(this._likes, this._userId);
    this._setCardContent();
    this._setLikesQuantity();
    this._toggleLikesClass();
    this._setEventListeners();
    return this._cardItem;
  };

  _toggleLikesClass() {
    switch (this._hasOwnerLike) {
      case true:
        this._cardLikeButton.classList.add(CARD.LIKE_BUTTON_ACTIVE);
        this._cardLikeButton.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"');
        break;
      case false:
        this._cardLikeButton.classList.remove(CARD.LIKE_BUTTON_ACTIVE);
        this._cardLikeButton.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"');
        break;
    }
  }

  _setEventListeners() {
    this._cardLikeButton.addEventListener(EVENT.CLICK, () => this._handleLikeBtnClick(this));
    this._cardImage.addEventListener(EVENT.CLICK, () => this._handleImageClick(this));
    this._owner._id === this._userId
      ? this._cardDelete.addEventListener(EVENT.CLICK, this._handleDeleteBtnClick)
      : this._cardDelete.remove();
  }
}
