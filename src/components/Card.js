import { CARD, EVENT } from './enum.js';

export default class Card {
  constructor(
    selector,
    { name, link, owner, likes = [], id },
    userId,
    handleLikeBtnClick,
    handleDeleteBtnClick,
    handleImageClick
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
    this._cardTemplate = document.querySelector(CARD.TEMPLATE).content.querySelector(CARD.ITEM);
    this._cardItem = this._cardTemplate.cloneNode(true);
    this._cardArticle = this._cardItem.querySelector(CARD.ARTICLE);
    this._cardImage = this._cardArticle.querySelector(CARD.IMAGE);
    this._cardTitle = this._cardArticle.querySelector(CARD.TITLE);
    this._cardLikeNumber = this._cardArticle.querySelector(CARD.LIKE_NUMBER);
    this._cardLikeButton = this._cardArticle.querySelector(CARD.LIKE_BUTTON);
    this._cardDelete = this._cardArticle.querySelector(CARD.DELETE);
    this._hasOwnerLike = this.updateOwnersLike(this._likes, this._userId);
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

  generate() {
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

// import { openPopup, handleSubmit } from './popup-old.js';
// import { POPUP, CARD, EVENT, FORM } from './enum.js';
// import deleteCardService from './deleteCardService.js';
// // import { createError } from './Error.js';
//
// const cardTemplate = document.querySelector(CARD.TEMPLATE).content.querySelector(CARD.ITEM);
// const popupDelete = document.querySelector(POPUP.TYPE_DELETE);
// const popupPhoto = document.querySelector(POPUP.TYPE_PHOTO);
// const popupImage = popupPhoto.querySelector(POPUP.IMAGE);
// const popupTitle = popupPhoto.querySelector(POPUP.TITLE);
//
// const checkLikeButtonActiveClass = (el) => {
//   return el.classList.contains(CARD.LIKE_BUTTON_ACTIVE);
// };
//
// const findCurrentCard = (id) => {
//   return cards.find(card => card._id === id);
// };
//
// const handleLikeButton = (button, number, id, initialLikes, userId) => {
//   const current = findCurrentCard(id);
//   updateOwnersLike(current.likes, userId);
//   button.setAttribute('disabled', 'disabled');
//
//   const promise = hasOwnerLike? deleteCardLike(id) : addCardLike(id)
//
//   promise
//     .then((res) => {
//       updateOwnersLike(res.likes, userId);
//       current.likes = res.likes;
//       setCardLikes(button, number, res.likes.length);
//       const hasActiveClass = checkLikeButtonActiveClass(button);
//       toggleLike(button, hasActiveClass);
//     })
//     .catch((error) => createError(error.status, `Ошибка лайка карточки.`))
//     .finally(() => button.removeAttribute('disabled', 'disabled'));
// };
//
// const handlePhotoOverlay = (cardImage, cardTitle) => {
//   openPopup(popupPhoto);
//   popupTitle.textContent = cardTitle.textContent;
//   popupImage.setAttribute('src', cardImage.getAttribute('src'));
//   popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
// };
//
// const handleDeleteButton = (target, cardId) => {
//   deleteCardService.delete = (e) => handleDeleteSubmit(e, target, cardId);
//   openPopup(popupDelete);
// };
//
// function handleDeleteSubmit(e, target, cardId) {
//   const cardElement = target.closest(CARD.ITEM);
//
//   const submitDeleteCardRequest = () => {
//     return removeCard(cardId)
//       .then(() => cardElement.remove())
//   };
//
//   handleSubmit(submitDeleteCardRequest, e, 'удаления карточки.', FORM.BUTTON_TEXT_DELETE, FORM.BUTTON_TEXT_DELETING);
// }
