import { closePopup, openPopup } from './popup.js';
import { createCard, prependCard } from './card.js';
import { PROFILE, POPUP } from './enum.js';
import { updateUser, addCard } from './api.js';

const profilePopup = document.querySelector(POPUP.PROFILE);
const profileName = document.querySelector(PROFILE.CONTENT_NAME);
const profileAvatar = document.querySelector(PROFILE.CONTENT_AVATAR);
const profileOccupation = document.querySelector(PROFILE.CONTENT_OCCUPATION);
const profilePopupOpenButton = document.querySelector(PROFILE.BUTTON_EDIT);
const profilePopupForm = document.forms[PROFILE.FORM_PROFILE];
const profilePopupNameInput = profilePopupForm.querySelector(PROFILE.INPUT_NAME);
const profilePopupOccupationInput = profilePopupForm.querySelector(PROFILE.INPUT_OCCUPATION);
const cardPopup = document.querySelector(POPUP.CARD);
const cardPopupOpenButton = document.querySelector(PROFILE.BUTTON_ADD);
const cardPopupForm = document.forms[PROFILE.FORM_CARD];
const cardPopupTitleInput = cardPopupForm.querySelector(POPUP.INPUT_TITLE);
const cardPopupLinkInput = cardPopupForm.querySelector(POPUP.INPUT_LINK);

const setForm = () => {
  profilePopupNameInput.value = profileName.textContent;
  profilePopupOccupationInput.value = profileOccupation.textContent;
};

const setProfileAvatar = (src) => {
  profileAvatar.setAttribute('src', src);
};

const setProfileName = (name) => {
  profileName.textContent = name;
};

const setProfileOccupation = (occupation) => {
  profileOccupation.textContent = occupation;
};

const handleOpenProfile = () => {
  openPopup(profilePopup);
  setForm();
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  setProfileName(profilePopupNameInput.value);
  setProfileOccupation(profilePopupOccupationInput.value);
  const user = { name: profilePopupNameInput.value, about: profilePopupOccupationInput.value };
  updateUser(user)
    .then(user => {
      setProfileName(user.name);
      setProfileOccupation(user.about);
    })
    .catch((error) => {
      console.error(
        `Ошибка ${error.status} редактирования профиля: ${error.statusText}`
      );
    });
  closePopup(profilePopup);
};

const handleCardPopupOpenButton = () => {
  openPopup(cardPopup);
};

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  const card = {
    name: cardPopupTitleInput.value,
    link: cardPopupLinkInput.value
  };
  addCard(card)
    .then((card) => {
      const cardClone = createCard(card.name, card.link);
      prependCard(cardClone);
    })
    .catch((error) => {
      console.error(`Ошибка ${error.status} cоздания карточки: ${error.statusText}`);
    });
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
  addProfileListeners,
  setProfileAvatar,
  setProfileName,
  setProfileOccupation
};
