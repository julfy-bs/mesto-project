import { openPopup, handleSubmit } from './popup.js';
import { POPUP, CARD, EVENT, FORM } from './enum.js';
import deleteCardService from './deleteCardService.js';
import { createError } from './error.js';

const cardTemplate = document.querySelector(CARD.TEMPLATE).content.querySelector(CARD.ITEM);
const cardsWrapper = document.querySelector(CARD.WRAPPER);
const popupDelete = document.querySelector(POPUP.TYPE_DELETE);
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

  const promise = hasOwnerLike? deleteCardLike(id) : addCardLike(id)

  promise
    .then((res) => {
      updateOwnersLike(res.likes, userId);
      current.likes = res.likes;
      setCardLikes(button, number, res.likes.length);
      const hasActiveClass = checkLikeButtonActiveClass(button);
      toggleLike(button, hasActiveClass);
    })
    .catch((error) => createError(error.status, `Ошибка лайка карточки.`))
    .finally(() => button.removeAttribute('disabled', 'disabled'));
};

const handlePhotoOverlay = (cardImage, cardTitle) => {
  openPopup(popupPhoto);
  popupTitle.textContent = cardTitle.textContent;
  popupImage.setAttribute('src', cardImage.getAttribute('src'));
  popupImage.setAttribute('alt', cardImage.getAttribute('alt'));
};

const handleDeleteButton = (target, cardId) => {
  deleteCardService.delete = (e) => handleDeleteSubmit(e, target, cardId);
  openPopup(popupDelete);
};

function handleDeleteSubmit(e, target, cardId) {
  const cardElement = target.closest(CARD.ITEM);

  const submitDeleteCardRequest = () => {
    return removeCard(cardId)
      .then(() => cardElement.remove())
  };

  handleSubmit(submitDeleteCardRequest, e, 'удаления карточки.', FORM.BUTTON_TEXT_DELETE, FORM.BUTTON_TEXT_DELETING);
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

  cardLikeButton.addEventListener(EVENT.CLICK, () => handleLikeButton(cardLikeButton, cardLikeNumber, card._id, card.likes, userId));
  cardImage.addEventListener(EVENT.CLICK, () => handlePhotoOverlay(cardImage, cardTitle));
  card.owner._id === userId
    ? cardDelete.addEventListener(EVENT.CLICK, ({ target }) => handleDeleteButton(target, card._id))
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
