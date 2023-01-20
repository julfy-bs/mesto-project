import { closePopup, openPopup } from './popup.js';
import { createCard, prependCard } from './card.js';
import { PROFILE, POPUP } from './enum.js';

const profilePopup = document.querySelector(POPUP.PROFILE);
const profileNameContent = document.querySelector(PROFILE.CONTENT_NAME);
const profileOccupationContent = document.querySelector(PROFILE.CONTENT_OCCUPATION);
const profilePopupOpenButton = document.querySelector(PROFILE.BUTTON_EDIT);
const profilePopupForm = document.forms[PROFILE.FORM_PROFILE];
const profilePopupNameInput = profilePopupForm.querySelector(PROFILE.INPUT_NAME);
const profilePopupOccupationInput = profilePopupForm.querySelector(PROFILE.INPUT_OCCUPATION);
const cardPopup = document.querySelector(POPUP.CARD);
const cardPopupOpenButton = document.querySelector(PROFILE.BUTTON_ADD);
const cardPopupForm = document.forms[PROFILE.FORM_CARD];
const cardPopupTitleInput = cardPopupForm.querySelector(POPUP.INPUT_TITLE);
const cardPopupLinkInput = cardPopupForm.querySelector(POPUP.INPUT_LINK);

const setForm = (el, title) => {
  el.value = title.textContent;
};

const setProfile = (el, title) => {
  el.textContent = title.value;
};

const handleOpenProfile = () => {
  openPopup(profilePopup);
  setForm(profilePopupNameInput, profileNameContent);
  setForm(profilePopupOccupationInput, profileOccupationContent);
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  setProfile(profileNameContent, profilePopupNameInput);
  setProfile(profileOccupationContent, profilePopupOccupationInput);
  closePopup(profilePopup);
};

const handleCardPopupOpenButton = () => {
  openPopup(cardPopup);
};

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const card = {
    title: cardPopupTitleInput.value,
    image: cardPopupLinkInput.value
  };
  const cardClone = createCard(card.title, card.image);
  prependCard(cardClone);
  closePopup(cardPopup);
  cardPopupForm.reset();
};

const addProfileListeners = () => {
  cardPopupOpenButton.addEventListener('click', () => handleCardPopupOpenButton());
  cardPopupForm.addEventListener('submit', (e) => handleCardFormSubmit(e));
  profilePopupOpenButton.addEventListener('click', () => handleOpenProfile());
  profilePopupForm.addEventListener('submit', (e) => handleProfileFormSubmit(e));
};

export {
  addProfileListeners
};
