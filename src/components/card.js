import { changeButtonText, closePopup, openPopup } from './popup.js';
import { POPUP, CARD, FORM, EVENT } from './enum.js';
import { addCardLike, deleteCardLike, removeCard } from './api.js';
import deleteCardService from './deleteCardService.js';

const cardTemplate = document.querySelector(CARD.TEMPLATE).content.querySelector(CARD.ITEM);
const cardsWrapper = document.querySelector(CARD.WRAPPER);
const popupDelete = document.querySelector(POPUP.TYPE_DELETE);
const popupDeleteForm = document.forms[FORM.NAME_DELETE];
const popupPhoto = document.querySelector(POPUP.TYPE_PHOTO);
const popupImage = popupPhoto.querySelector(POPUP.IMAGE);
const popupTitle = popupPhoto.querySelector(POPUP.TITLE);
let hasOwnerLike;
const cards = [];

const setCardName = (el, title) => {
  el.textContent = title;
};

const setCardImage = (el, title, image) => {
  el.setAttribute('src', image);
  el.setAttribute('alt', title);
};

const addLikeActiveClass = (el) => {
  el.classList.add(CARD.LIKE_BUTTON_ACTIVE);
  el.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"');
};

const removeLikeActiveClass = (el) => {
  el.classList.remove(CARD.LIKE_BUTTON_ACTIVE);
  el.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"');
};

const toggleLike = (el, hasActiveClass) => {
  switch (hasActiveClass) {
    case true:
      removeLikeActiveClass(el);
      break;
    case false:
      addLikeActiveClass(el);
      break;
  }
};

const checkLikeButtonActiveClass = (el) => {
  return el.classList.contains(CARD.LIKE_BUTTON_ACTIVE);
};

const setCardLikes = (button, number, value = 0) => {
  if (typeof value !== 'number') console.error('Значение количества лайков карточки должно быть числом');
  switch (value) {
    case 0:
      button.classList.remove(CARD.LIKE_BUTTON_IS_LIKED);
      number.textContent = '';
      break;
    default:
      button.classList.add(CARD.LIKE_BUTTON_IS_LIKED);
      number.textContent = value;
      break;
  }
};

const getCardLikes = (el) => {
  return Number(el.textContent);
};

const increaseCardLikes = (button, number, value) => {
  const increasedValue = value + 1;
  typeof value !== 'number'
    ? console.error('Значение количества лайков карточки должно быть числом')
    : setCardLikes(button, number, increasedValue);
};

const decreaseCardLikes = (button, number, value) => {
  const decreasedValue = value - 1;
  typeof value !== 'number'
    ? console.error('Значение количества лайков карточки должно быть числом')
    : setCardLikes(button, number, decreasedValue);
};

const updateOwnersLike = (likesArray, userId) => {
  switch (likesArray.length) {
    case 0:
      hasOwnerLike = false;
      break;
    default:
      hasOwnerLike = likesArray.some(like => like._id === userId);
      break;
  }
};

const findCurrentCard = (id) => {
  return cards.find(card => card._id === id);
};

const handleLikeButton = (button, number, id, initialLikes, userId) => {
  const current = findCurrentCard(id);
  updateOwnersLike(current.likes, userId);
  button.setAttribute('disabled', 'disabled');
  switch (hasOwnerLike) {
    case true:
      deleteCardLike(id)
        .then((res) => {
          updateOwnersLike(res.likes, userId);
          /*
            Понимаю, что решение мутировать исходный массив - не лучшее, но я не знаю как еще можно хранить информацию каждой карточки без стора или классов.
            +
            Не получается исправить баг: при множественном нажатии на лайк, состояние лайка не всегда отправляется на сервер.
          */
          current.likes = res.likes;
        })
        .catch((error) => console.error(`Ошибка ${error.status} удаления лайка карточки: ${error.statusText}`))
        .finally(() => button.removeAttribute('disabled', 'disabled'));
      break;
    case false:
      addCardLike(id)
        .then((res) => {
          updateOwnersLike(res.likes, userId);
          current.likes = res.likes;
        })
        .catch((error) => console.error(`Ошибка ${error.status} добавления лайка карточки: ${error.statusText}`))
        .finally(() => button.removeAttribute('disabled', 'disabled'));
      break;
  }
  const value = getCardLikes(number);
  const hasActiveClass = checkLikeButtonActiveClass(button);
  hasActiveClass ? decreaseCardLikes(button, number, value) : increaseCardLikes(button, number, value);
  toggleLike(button, hasActiveClass);
};

const handlePhotoOverlay = (cardImage, cardTitle) => {
  openPopup(popupPhoto);
  popupTitle.textContent = cardTitle.textContent;
  popupImage.setAttribute('src', cardImage.getAttribute('src'));
  popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
};

const handleDeleteButton = (target, cardId) => {
  deleteCardService.delete = () => handleDeleteSubmit(target, cardId);
  openPopup(popupDelete);
};

const removeCardListeners = (photoOverlay, deleteButton, likeButton) => {
  photoOverlay.removeEventListener(EVENT.MOUSEDOWN, handlePhotoOverlay);
  deleteButton.removeEventListener(EVENT.MOUSEDOWN, handleDeleteButton);
  likeButton.removeEventListener(EVENT.MOUSEDOWN, handleLikeButton);
};

function handleDeleteSubmit(target, cardId) {
  changeButtonText(popupDeleteForm, FORM.BUTTON_TEXT_DELETING);
  const cardElement = target.closest(CARD.ITEM);
  const cardPhotoOverlay = cardElement.querySelector(CARD.IMAGE);
  const cardLikeButton = cardElement.querySelector(CARD.LIKE_BUTTON);
  const cardDeleteButton = cardElement.querySelector(CARD.DELETE);

  removeCard(cardId)
    .then(() => cardElement.remove())
    .catch((error) => console.error(`Ошибка ${error.status} удаления карточки: ${error.statusText}`))
    .finally(() => {
      changeButtonText(popupDeleteForm, FORM.BUTTON_TEXT_SAVE);
      closePopup(popupDelete);
      removeCardListeners(cardPhotoOverlay, cardDeleteButton, cardLikeButton);
    });
}

const createCard = (card, userId) => {
  const cardItem = cardTemplate.cloneNode(true);
  const cardArticle = cardItem.querySelector(CARD.ARTICLE);
  const cardImage = cardArticle.querySelector(CARD.IMAGE);
  const cardTitle = cardArticle.querySelector(CARD.TITLE);
  const cardLikeNumber = cardArticle.querySelector(CARD.LIKE_NUMBER);
  const cardLikeButton = cardArticle.querySelector(CARD.LIKE_BUTTON);
  const cardDelete = cardArticle.querySelector(CARD.DELETE);
  const cardLikesDefaultValue = 0;
  const likesCount = card.likes.length > 0 ? card.likes.length : cardLikesDefaultValue;
  cards.push(card);

  updateOwnersLike(card.likes, userId);
  setCardName(cardTitle, card.name);
  setCardImage(cardImage, card.name, card.link);
  setCardLikes(cardLikeButton, cardLikeNumber, likesCount);
  hasOwnerLike
    ? addLikeActiveClass(cardLikeButton)
    : removeLikeActiveClass(cardLikeButton);

  cardLikeButton.addEventListener(EVENT.MOUSEDOWN, () => handleLikeButton(cardLikeButton, cardLikeNumber, card._id, card.likes, userId));
  cardImage.addEventListener(EVENT.MOUSEDOWN, () => handlePhotoOverlay(cardImage, cardTitle));
  card.owner._id === userId
    ? cardDelete.addEventListener(EVENT.MOUSEDOWN, ({ target }) => handleDeleteButton(target, card._id))
    : cardDelete.remove();

  return cardItem;
};

const prependCard = (card) => {
  cardsWrapper.prepend(card);
};

export {
  createCard,
  prependCard
};
