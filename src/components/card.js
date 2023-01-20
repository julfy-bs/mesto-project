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

const handleLikeButton = (element) => toggleLike(element);

const handleDeleteButton = (cardItem) => {
  if (cardItem.classList.contains(CARD.ITEM_CLASSNAME)) cardItem.remove();
};

const handlePhotoOverlay = (cardImage, cardTitle) => {
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

  cardLike.addEventListener('click', () => handleLikeButton(cardLike));
  cardDelete.addEventListener('click', () => handleDeleteButton(cardItem));
  cardImage.addEventListener('click', () => handlePhotoOverlay(cardImage, cardTitle));

  return cardItem;
};

const prependCard = (card) => {
  cardsWrapper.prepend(card);
};

export {
  createCard,
  prependCard
}
