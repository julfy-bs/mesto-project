import { openPopup } from './popup.js';

/* ENUM START */
const CARD = {
  TEMPLATE: '#card',
  ITEM: '.feed__item',
  ITEM_CLASSNAME: 'feed__item',
  ARTICLE: '.card',
  IMAGE: '.card__image',
  TITLE: '.card__title',
  LIKE: '.card__like',
  DELETE: '.card__delete',
  WRAPPER: '.feed__list',
  LIKE_ACTIVE: 'card__like_active',
  POPUP: '.popup_type_photo',
  POPUP_IMAGE: '.popup__image',
  POPUP_TITLE: '.popup__figcaption'
}
/* ENUM END */
const cardTemplate = document.querySelector(CARD.TEMPLATE).content.querySelector(CARD.ITEM);
const cardsWrapper = document.querySelector(CARD.WRAPPER);
const popupPhoto = document.querySelector(CARD.POPUP);
const popupImage = popupPhoto.querySelector(CARD.POPUP_IMAGE);
const popupTitle = popupPhoto.querySelector(CARD.POPUP_TITLE);

const toggleLike = (el) => {
  const isLiked = el.classList.contains(CARD.LIKE_ACTIVE);
  el.classList.toggle(CARD.LIKE_ACTIVE);
  if (isLiked) {
    el.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"');
  } else {
    el.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"');
  }
};

const handleLikeButtonListener = (e) => toggleLike(e.target);

const handleDeleteButtonListener = (e) => {
  const cardItem = e.target.parentNode.parentNode
  if (cardItem.classList.contains(CARD.ITEM_CLASSNAME)) cardItem.remove();
}

const handlePhotoOverlayListener = (e) => {
  const cardImage = e.target;
  const cardTitle = cardImage.parentNode.querySelector(CARD.TITLE)

  openPopup(popupPhoto);

  popupTitle.textContent = cardTitle.textContent;
  popupImage.setAttribute('src', cardImage.getAttribute('src'));
  popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
}

const setCardName = (el, title) => {
  el.textContent = title;
}

const setCardImage = (el, title, image) => {
  el.setAttribute('src', image);
  el.setAttribute('alt', title);
}

export const createCard = (title, image) => {
  const cardItem = cardTemplate.cloneNode(true);
  const card = cardItem.querySelector(CARD.ARTICLE);
  const cardImage = card.querySelector(CARD.IMAGE);
  const cardTitle = card.querySelector(CARD.TITLE);
  const cardLike = card.querySelector(CARD.LIKE);
  const cardDelete = card.querySelector(CARD.DELETE);

  setCardName(cardTitle, title);
  setCardImage(cardImage, title, image);

  cardLike.addEventListener('click', handleLikeButtonListener);
  cardDelete.addEventListener('click', handleDeleteButtonListener);
  cardImage.addEventListener('click', handlePhotoOverlayListener);

  return cardItem;
};

export const addCard = (card) => {
  cardsWrapper.prepend(card);
};
