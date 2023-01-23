import { openPopup } from './popup.js';
import { POPUP, CARD } from './enum.js';
import { removeCard, toggleCardLike } from './api.js';

const cardTemplate = document.querySelector(CARD.TEMPLATE).content.querySelector(CARD.ITEM);
const cardsWrapper = document.querySelector(CARD.WRAPPER);
const popupPhoto = document.querySelector(POPUP.PHOTO);
const popupImage = popupPhoto.querySelector(POPUP.IMAGE);
const popupTitle = popupPhoto.querySelector(POPUP.TITLE);

const addLikeActiveClass = (el) => {
  el.classList.add(CARD.LIKE_BUTTON_ACTIVE);
  el.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"');
};

const removeLikeActiveClass = (el) => {
  el.classList.remove(CARD.LIKE_BUTTON_ACTIVE);
  el.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"');
};

const toggleLike = (el, hasActiveClass) => {
  !hasActiveClass
    ? addLikeActiveClass(el)
    : removeLikeActiveClass(el);
};

const setCardLikes = (button, number, value = 0) => {
  if (value === 0) {
    button.classList.remove(CARD.LIKE_BUTTON_IS_LIKED);
    number.textContent = '';
  } else {
    button.classList.add(CARD.LIKE_BUTTON_IS_LIKED);
    number.textContent = value;
  }
};

const checkOwnersLike = (likesArray, userId) => {
  let result;
  if (likesArray.length === 0) {
    result = false;
  }
  if (likesArray.length > 0) {
    result = likesArray.some(like => like._id === userId);
  }
  console.log(result, likesArray);
  return result;
};

const handleLikeButton = (button, number, id, hasOwnerLike, userId) => {
  toggleCardLike(id, hasOwnerLike)
    .then((res) => {
      let value = +number.textContent;
      const hasActiveClass = button.classList.contains(CARD.LIKE_BUTTON_ACTIVE);
      hasActiveClass ? value-- : value++;
      toggleLike(button, hasActiveClass);
      setCardLikes(button, number, value);
      checkOwnersLike(res.likes, userId);
    })
    .catch((error) => console.error(`Ошибка ${error.status} лайка карточки: ${error.statusText}`));
};

const handleDeleteButton = (cardItem, cardId) => {
  removeCard(cardId)
    .then(() => cardItem.remove())
    .catch((error) => console.error(`Ошибка ${error.status} лайка карточки: ${error.statusText}`));
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

const createCard = (card, userId) => {
  const cardItem = cardTemplate.cloneNode(true);
  const cardArticle = cardItem.querySelector(CARD.ARTICLE);
  const cardImage = cardArticle.querySelector(CARD.IMAGE);
  const cardTitle = cardArticle.querySelector(CARD.TITLE);
  const cardLikeNumber = cardArticle.querySelector(CARD.LIKE_NUMBER);
  const cardLikeButton = cardArticle.querySelector(CARD.LIKE_BUTTON);
  const cardDelete = cardArticle.querySelector(CARD.DELETE);
  const likesCount = card.likes.length > 0 ? card.likes.length : 0;
  let hasOwnerLike = checkOwnersLike(card.likes, userId);



  setCardName(cardTitle, card.name);
  setCardImage(cardImage, card.name, card.link);
  setCardLikes(cardLikeButton, cardLikeNumber, likesCount);
  hasOwnerLike ? addLikeActiveClass(cardLikeButton) : removeLikeActiveClass(cardLikeButton);

  cardLikeButton.addEventListener('click', () => handleLikeButton(cardLikeButton, cardLikeNumber, card._id, hasOwnerLike, userId));

  card.owner._id === userId
    ? cardDelete.addEventListener('click', () => handleDeleteButton(cardItem, card._id))
    : cardDelete.remove();

  cardImage.addEventListener('click', () => handlePhotoOverlay(cardImage, cardTitle));

  return cardItem;
};

const prependCard = (card) => {
  cardsWrapper.prepend(card);
};

export {
  createCard,
  prependCard
};
