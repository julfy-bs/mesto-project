import './styles/pages/index.css';
import { FORM, VALIDATION } from './components/enum.js';
import { createCard, prependCard } from './components/card.js';
import { addProfileListeners, setProfileAvatar, setProfileName, setProfileOccupation } from './components/profile.js';
import { enableValidation } from './components/validation.js';
import { getUser, getCards } from './components/api.js';
import { addDeletePopupSubmitListener } from './components/popup.js';
import { startLoader } from './components/loader.js';

const cardDeletePopupForm = document.forms[FORM.NAME_DELETE];
let userId = localStorage.getItem('userId') || null;

addProfileListeners();
addDeletePopupSubmitListener(cardDeletePopupForm);

enableValidation({
  formSelector: VALIDATION.FORM_SELECTOR,
  inputSelector: VALIDATION.INPUT_SELECTOR,
  buttonSelector: VALIDATION.BUTTON_SELECTOR,
  errorSelector: VALIDATION.ERROR_SELECTOR,
  inputErrorClass: VALIDATION.INPUT_ERROR_CLASS,
  buttonDisabledClass: VALIDATION.BUTTON_DISABLED_CLASS,
  errorActiveClass: VALIDATION.ERROR_ACTIVE_CLASS
});


document.addEventListener('DOMContentLoaded', () => {
  startLoader();
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
