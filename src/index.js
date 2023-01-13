import { initialArray } from './scripts/initialArray.js';
import './pages/index.css';

const popupPhoto = document.querySelector('.popup_type_photo');
const popupCloseButton = popupPhoto.querySelector('.popup__close');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupTitle = popupPhoto.querySelector('.popup__figcaption');
const cardsWrapper = document.querySelector('.feed__list');
const cardTemplate = document.querySelector('#card').content.querySelector('.feed__item');
const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup-edit');
const popupProfileCloseButton = popupProfile.querySelector('.popup__close');
const popupProfileForm = popupProfile.querySelector('.form');
const popupProfileNameInput = popupProfileForm.querySelector('[name=\'name\']');
const popupProfileOccupationInput = popupProfileForm.querySelector('[name=\'occupation\']');
const profileNameContent = document.querySelector('.profile__name');
const profileOccupationContent = document.querySelector('.profile__occupation');
const popupCardOpenButton = document.querySelector('.profile__add');
const popupCard = document.querySelector('.popup-add');
const popupCardCloseButton = popupCard.querySelector('.popup__close');
const popupCardForm = popupCard.querySelector('.form');
const popupCardTitleInput = popupCardForm.querySelector('[name=\'title\']');
const popupCardLinkInput = popupCardForm.querySelector('[name=\'link\']');

const closePopup = (popup) => {
  popup.classList.remove('popup_active');
};

const openPopup = (popup) => {
  popup.classList.add('popup_active');
};

const addCard = (card) => {
  cardsWrapper.prepend(card);
};

const addCardPhotoPopup = (title, image) => {
  image.addEventListener('click', () => {
    openPopup(popupPhoto);
    popupTitle.textContent = title.textContent;
    popupImage.setAttribute('src', image.getAttribute('src'));
    popupImage.setAttribute('alt', image.getAttribute('alt'));
  });
};

const addCardLike = (likeButton) => {
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like_active');
    if (likeButton.classList.contains('card__like_active')) {
      likeButton.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"');
    } else {
      likeButton.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"');
    }
  });
};

const deleteCard = (deleteButton, card) => {
  deleteButton.addEventListener('click', () => {
    card.remove();
  });
};

const createCard = (title, image, template) => {
  const cardClone = template.cloneNode(true);
  const cardCloneImage = cardClone.querySelector('.card__image');
  const cardCloneTitle = cardClone.querySelector('.card__title');
  const cardCloneLikeButton = cardClone.querySelector('.card__like');
  const cardCloneDeleteButton = cardClone.querySelector('.card__delete');

  cardCloneTitle.textContent = title;
  cardCloneImage.setAttribute('src', image);
  cardCloneImage.setAttribute('alt', title);

  addCardPhotoPopup(cardCloneTitle, cardCloneImage);
  addCardLike(cardCloneLikeButton);
  deleteCard(cardCloneDeleteButton, cardClone);

  return cardClone;
};

popupPhoto.addEventListener('click', (e) => {
  if (e.target === popupPhoto || e.target === popupCloseButton) closePopup(popupPhoto);
});
popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfileNameInput.value = profileNameContent.textContent;
  popupProfileOccupationInput.value = profileOccupationContent.textContent;
});
popupProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileNameContent.textContent = popupProfileNameInput.value;
  profileOccupationContent.textContent = popupProfileOccupationInput.value;
  closePopup(popupProfile);
});
popupProfile.addEventListener('click', (e) => {
  if (e.target === popupProfile || e.target === popupProfileCloseButton) closePopup(popupProfile);
});
popupCardOpenButton.addEventListener('click', () => {
  openPopup(popupCard);
});
popupCardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const card = {
    title: popupCardTitleInput.value, image: popupCardLinkInput.value
  };
  const cardClone = createCard(card.title, card.image, cardTemplate);
  addCard(cardClone);
  closePopup(popupCard);
  popupCardTitleInput.value = '';
  popupCardLinkInput.value = '';
});
popupCard.addEventListener('click', (e) => {
  if (e.target === popupCard || e.target === popupCardCloseButton) closePopup(popupCard);
});

initialArray.forEach(card => {
  const cardClone = createCard(card.title, card.image, cardTemplate);
  addCard(cardClone);
});
