import { initialArray } from './components/initialArray.js';
import { closePopup, openPopup } from './components/popup.js';
import { createCard, addCard } from './components/card.js';
import './styles/pages/index.css';


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
  const cardClone = createCard(card.title, card.image);
  addCard(cardClone);
  closePopup(popupCard);
  popupCardTitleInput.value = '';
  popupCardLinkInput.value = '';
});

popupCard.addEventListener('click', (e) => {
  if (e.target === popupCard || e.target === popupCardCloseButton) closePopup(popupCard);
});

initialArray.forEach(card => {
  const cardClone = createCard(card.title, card.image);
  addCard(cardClone);
});
