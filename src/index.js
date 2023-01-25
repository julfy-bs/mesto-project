import './styles/pages/index.css';
import { initialArray } from './components/initialArray.js';
import { VALIDATION, PROFILE } from './components/enum.js';
import { createCard, prependCard } from './components/card.js';
import { addProfileListeners, setProfileAvatar, setProfileName, setProfileOccupation } from './components/profile.js';
import { enableValidation } from './components/validation.js';
import { getUser, getCards } from './components/api.js';

const profileAvatar = document.querySelector(PROFILE.CONTENT_AVATAR);
const profileName = document.querySelector(PROFILE.CONTENT_NAME);
const profileOccupation = document.querySelector(PROFILE.CONTENT_OCCUPATION);
let userId = localStorage.getItem('userId') || null;

addProfileListeners();

enableValidation({
  formSelector: VALIDATION.FORM_SELECTOR,
  inputSelector: VALIDATION.INPUT_SELECTOR,
  buttonSelector: VALIDATION.BUTTON_SELECTOR,
  errorSelector: VALIDATION.ERROR_SELECTOR,
  inputErrorClass: VALIDATION.INPUT_ERROR_CLASS,
  buttonDisabledClass: VALIDATION.BUTTON_DISABLED_CLASS,
  errorActiveClass: VALIDATION.ERROR_ACTIVE_CLASS
});

/* TODO:
1. loader
* */


// initialArray.forEach(card => {
//   const cardClone = createCard(card.title, card.image);
//   prependCard(cardClone);
// });

document.addEventListener('DOMContentLoaded', () => {
  getUser()
    .then((user) => {
      setProfileAvatar(user.avatar);
      setProfileName(user.name);
      setProfileOccupation(user.about);
      userId = user._id;
      localStorage.setItem('userId', userId);
    });
  getCards()
    .then((cards) => {
      cards
        .reverse()
        .forEach(card => {
          const cardClone = createCard(card, userId);
          prependCard(cardClone);
        });
    });
});
