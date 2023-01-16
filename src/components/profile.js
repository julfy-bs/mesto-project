import { closePopup, openPopup } from './popup.js';
import { createCard, prependCard } from './card.js';
import { PROFILE, POPUP } from './enum.js';


const popupProfile = document.querySelector(POPUP.EDIT);
const popupProfileForm = popupProfile.querySelector(PROFILE.FORM);
const popupProfileNameInput = popupProfileForm.querySelector(PROFILE.INPUT_NAME);
const profileNameContent = document.querySelector(PROFILE.CONTENT_NAME);
const popupProfileOccupationInput = popupProfileForm.querySelector(PROFILE.INPUT_OCCUPATION);
const profileOccupationContent = document.querySelector(PROFILE.CONTENT_OCCUPATION);
const popupProfileOpenButton = document.querySelector(PROFILE.BUTTON_EDIT);
const popupCardOpenButton = document.querySelector(PROFILE.BUTTON_ADD);
const popupCard = document.querySelector(POPUP.ADD);
const popupCardForm = popupCard.querySelector(POPUP.FORM);
const popupCardTitleInput = popupCardForm.querySelector(POPUP.INPUT_TITLE);
const popupCardLinkInput = popupCardForm.querySelector(POPUP.INPUT_LINK);

const setForm = (el, title) => {
  el.value = title.textContent;
};

const setProfile = (el, title) => {
  el.textContent = title.value;
};

const handleOpenProfileListener = () => {
  openPopup(popupProfile);
  setForm(popupProfileNameInput, profileNameContent);
  setForm(popupProfileOccupationInput, profileOccupationContent);
};

const handleCloseProfileListener = (e) => {
  e.preventDefault();
  setProfile(profileNameContent, popupProfileNameInput);
  setProfile(profileOccupationContent, popupProfileOccupationInput);
  closePopup(popupProfile);
};

const handleOpenAddProfileListener = () => {
  openPopup(popupCard);
};

const handleCloseAddProfileListener = (e) => {
  e.preventDefault();
  const card = {
    title: popupCardTitleInput.value,
    image: popupCardLinkInput.value
  };
  const cardClone = createCard(card.title, card.image);
  prependCard(cardClone);
  closePopup(popupCard);
  popupCardForm.reset();
};

export const addProfileListeners = () => {
  popupCardOpenButton.addEventListener('click', handleOpenAddProfileListener);
  popupCardForm.addEventListener('submit', handleCloseAddProfileListener);
  popupProfileOpenButton.addEventListener('click', handleOpenProfileListener);
  popupProfileForm.addEventListener('submit', handleCloseProfileListener);
};
