import { changeButtonText, closePopup, closePopupWithForm, openPopupWithForm } from './popup.js';
import { createCard, prependCard } from './card.js';
import { PROFILE, POPUP } from './enum.js';
import { updateUser, addCard, updateUserAvatar } from './api.js';

const avatarPopup = document.querySelector(POPUP.AVATAR);
const avatarPopupOpenButton = document.querySelector(PROFILE.AVATAR);
const avatarPopupForm = document.forms[PROFILE.FORM_AVATAR];
const avatarPopupLinkInput = avatarPopupForm.querySelector(POPUP.INPUT_LINK);
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
      changeButtonText(avatarPopupForm, POPUP.BUTTON_TEXT_SAVE);
      closePopup(avatarPopup);
    });
};

const handleOpenAvatar = () => {
  openPopupWithForm(avatarPopup, (e) => handleAvatarFormSubmit(e));
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
      changeButtonText(profilePopupForm, POPUP.BUTTON_TEXT_SAVE);
      closePopupWithForm(profilePopup, (e) => handleProfileFormSubmit(e));
    });
};

const handleOpenProfile = () => {
  openPopupWithForm(profilePopup, (e) => handleProfileFormSubmit(e));
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
      changeButtonText(cardPopupForm, POPUP.BUTTON_TEXT_CREATE);
      closePopup(cardPopup);
    });
};

const handleCardPopupOpenButton = () => {
  // openPopupWithForm(cardPopup, (e) => handleCardFormSubmit(e));
  const card = {
    name: 'test card',
    link: 'https://images.unsplash.com/photo-1564858763975-d99de59ee4bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80'
  };
  addCard(card)
    .then((card) => {
      const cardClone = createCard(card, card.owner._id);
      prependCard(cardClone);
    })
    .catch((error) => {
      console.error(`Ошибка ${error.status} cоздания карточки: ${error.statusText}`);
    })
    .finally(() => {
      cardPopupForm.reset();
      changeButtonText(cardPopupForm, POPUP.BUTTON_TEXT_CREATE);
      closePopup(cardPopup);
    });
};

const addProfileListeners = () => {
  cardPopupOpenButton.addEventListener('mousedown', () => handleCardPopupOpenButton());
  profilePopupOpenButton.addEventListener('mousedown', () => handleOpenProfile());
  avatarPopupOpenButton.addEventListener('mousedown', () => handleOpenAvatar());
};

export {
  addProfileListeners,
  setProfileAvatar,
  setProfileName,
  setProfileOccupation
};
