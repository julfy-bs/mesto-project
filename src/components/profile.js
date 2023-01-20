import { closePopup, openPopup } from './popup.js';
import { createCard, prependCard } from './card.js';
import { PROFILE, POPUP, VALIDATION } from './enum.js';
import { toggleButtonState } from './utils.js';


const popupProfileForm = document.forms[PROFILE.FORM_PROFILE];
const popupProfileNameInput = popupProfileForm.querySelector(PROFILE.INPUT_NAME);
const profileNameContent = document.querySelector(PROFILE.CONTENT_NAME);
const popupProfileOccupationInput = popupProfileForm.querySelector(PROFILE.INPUT_OCCUPATION);
const profileOccupationContent = document.querySelector(PROFILE.CONTENT_OCCUPATION);
const popupProfileOpenButton = document.querySelector(PROFILE.BUTTON_EDIT);
const popupCardOpenButton = document.querySelector(PROFILE.BUTTON_ADD);
const popupCardForm = document.forms[PROFILE.FORM_CARD];
const popupCardTitleInput = popupCardForm.querySelector(POPUP.INPUT_TITLE);
const popupCardLinkInput = popupCardForm.querySelector(POPUP.INPUT_LINK);

const setForm = (el, title) => {
  el.value = title.textContent;
};

const setProfile = (el, title) => {
  el.textContent = title.value;
};

const handleOpenProfile = () => {
  const popupProfile = document.querySelector(POPUP.EDIT);
  openPopup(popupProfile);
  setForm(popupProfileNameInput, profileNameContent);
  setForm(popupProfileOccupationInput, profileOccupationContent);
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  setProfile(profileNameContent, popupProfileNameInput);
  setProfile(profileOccupationContent, popupProfileOccupationInput);
  const popup = e.target.closest('.popup')
  closePopup(popup);
};

const handleCardPopupOpenButton = () => {
  const popupCard = document.querySelector(POPUP.ADD);
  openPopup(popupCard);
};

const handleCardFormSubmit = (e) => {
  e.preventDefault();

  const card = {
    title: popupCardTitleInput.value,
    image: popupCardLinkInput.value
  };
  const cardClone = createCard(card.title, card.image);
  prependCard(cardClone);
  const popup = e.target.closest('.popup')
  closePopup(popup);

  popupCardForm.reset();
  const cardInputsList = Array.from(popupCardForm.querySelectorAll(VALIDATION.INPUT_SELECTOR));
  const cardSubmitButton = popupCardForm.querySelector(VALIDATION.BUTTON_SELECTOR);
  toggleButtonState(cardInputsList, cardSubmitButton, VALIDATION.BUTTON_DISABLED_CLASS);
};

const addProfileListeners = () => {
  popupCardOpenButton.addEventListener('click', () => handleCardPopupOpenButton());
  popupCardForm.addEventListener('submit', (e) => handleCardFormSubmit(e));
  popupProfileOpenButton.addEventListener('click', () => handleOpenProfile());
  popupProfileForm.addEventListener('submit', (e) => handleProfileFormSubmit(e));
};

export {
  addProfileListeners
};
