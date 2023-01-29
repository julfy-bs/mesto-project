import { changeButtonText, closePopup, openPopup } from './popup.js';
import { createCard, prependCard } from './card.js';
import { PROFILE, POPUP, FORM, EVENT } from './enum.js';
import { updateUser, addCard, updateUserAvatar } from './api.js';

const avatarPopup = document.querySelector(POPUP.TYPE_AVATAR);
const avatarPopupOpenButton = document.querySelector(PROFILE.AVATAR);
const avatarPopupForm = document.forms[FORM.NAME_AVATAR];
const avatarPopupLinkInput = avatarPopupForm.querySelector(FORM.INPUT_LINK);
const profilePopup = document.querySelector(POPUP.TYPE_PROFILE);
const profileName = document.querySelector(PROFILE.CONTENT_NAME);
const profileAvatar = document.querySelector(PROFILE.CONTENT_AVATAR);
const profileOccupation = document.querySelector(PROFILE.CONTENT_OCCUPATION);
const profilePopupOpenButton = document.querySelector(PROFILE.BUTTON_EDIT_PROFILE);
const profilePopupForm = document.forms[FORM.NAME_PROFILE];
const profilePopupNameInput = profilePopupForm.querySelector(FORM.INPUT_NAME);
const profilePopupOccupationInput = profilePopupForm.querySelector(FORM.INPUT_OCCUPATION);
const cardPopup = document.querySelector(POPUP.TYPE_CARD);
const cardPopupOpenButton = document.querySelector(PROFILE.BUTTON_ADD_CARD);
const cardPopupForm = document.forms[FORM.NAME_CARD];
const cardPopupTitleInput = cardPopupForm.querySelector(FORM.INPUT_TITLE);
const cardPopupLinkInput = cardPopupForm.querySelector(FORM.INPUT_LINK);

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

const handleAvatarFormSubmit = (e) => {
  e.preventDefault();
  changeButtonText(avatarPopupForm);
  const avatar = avatarPopupLinkInput.value;
  updateUserAvatar(avatar)
    .then((res) => {
      setProfileAvatar(res.avatar);
    })
    .catch((error) => console.error(`Ошибка ${error.status} изменения аватара пользователя: ${error.statusText}`))
    .finally(() => {
      avatarPopupForm.reset();
      changeButtonText(avatarPopupForm, FORM.BUTTON_TEXT_SAVE);
      closePopup(avatarPopup);
    });
};

const handleOpenAvatar = () => {
  openPopup(avatarPopup, (e) => handleAvatarFormSubmit(e));
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();
  changeButtonText(profilePopupForm);
  setProfileName(profilePopupNameInput.value);
  setProfileOccupation(profilePopupOccupationInput.value);
  const user = { name: profilePopupNameInput.value, about: profilePopupOccupationInput.value };
  updateUser(user)
    .then(user => {
      setProfileName(user.name);
      setProfileOccupation(user.about);
    })
    .catch((error) => console.error(`Ошибка ${error.status} редактирования информации профиля: ${error.statusText}`))
    .finally(() => {
      profilePopupForm.reset();
      changeButtonText(profilePopupForm, FORM.BUTTON_TEXT_SAVE);
      closePopup(profilePopup);
    });
};

const handleOpenProfile = () => {
  openPopup(profilePopup);
  setForm();
};

const handleCardFormSubmit = (e) => {
  e.preventDefault();
  changeButtonText(cardPopupForm);
  const card = {
    name: cardPopupTitleInput.value,
    link: cardPopupLinkInput.value
  };
  addCard(card)
    .then((card) => {
      const cardClone = createCard(card, card.owner._id);
      prependCard(cardClone);
    })
    .catch((error) => console.error(`Ошибка ${error.status} cоздания карточки: ${error.statusText}`))
    .finally(() => {
      cardPopupForm.reset();
      changeButtonText(cardPopupForm, FORM.BUTTON_TEXT_CREATE);
      closePopup(cardPopup);
    });
};

const handleCardPopupOpenButton = () => {
  openPopup(cardPopup);
};

const addProfileListeners = () => {
  cardPopupOpenButton.addEventListener(EVENT.MOUSEDOWN, () => handleCardPopupOpenButton());
  cardPopupForm.addEventListener(EVENT.SUBMIT, (e) => handleCardFormSubmit(e));
  profilePopupOpenButton.addEventListener(EVENT.MOUSEDOWN, () => handleOpenProfile());
  profilePopupForm.addEventListener(EVENT.SUBMIT, (e) => handleProfileFormSubmit(e));
  avatarPopupOpenButton.addEventListener(EVENT.MOUSEDOWN, () => handleOpenAvatar());
  avatarPopupForm.addEventListener(EVENT.SUBMIT, (e) => handleAvatarFormSubmit(e));
};

export {
  addProfileListeners,
  setProfileAvatar,
  setProfileName,
  setProfileOccupation
};
