import { openPopup } from './popup.js';
import { POPUP, CARD } from './enum.js';

const cardTemplate = document.querySelector(CARD.TEMPLATE).content.querySelector(CARD.ITEM);
const cardsWrapper = document.querySelector(CARD.WRAPPER);
const popupPhoto = document.querySelector(POPUP.PHOTO);
const popupImage = popupPhoto.querySelector(POPUP.IMAGE);
const popupTitle = popupPhoto.querySelector(POPUP.TITLE);

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
  const cardItem = e.target.closest(CARD.ITEM);
  if (cardItem.classList.contains(CARD.ITEM_CLASSNAME)) cardItem.remove();
};

const handlePhotoOverlayListener = (e) => {
  const cardImage = e.target;
  const cardTitle = cardImage.parentNode.querySelector(CARD.TITLE);

  openPopup(popupPhoto);

  popupTitle.textContent = cardTitle.textContent;
  popupImage.setAttribute('src', cardImage.getAttribute('src'));
  popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
};

const setCardName = (el, title) => {
  el.textContent = title;
};

const setCardImage = (el, title, image) => {
  el.setAttribute('src', image);
  el.setAttribute('alt', title);
};

const createCard = (title, image) => {
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

const prependCard = (card) => {
  cardsWrapper.prepend(card);
};

export {
  createCard,
  prependCard
}
