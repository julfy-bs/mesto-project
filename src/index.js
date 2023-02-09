import './styles/pages/index.css';
import { config, EVENT, FORM, VALIDATION } from './components/enum.js';
import { createCard, prependCard } from './components/card.js';
import { addProfileListeners, setProfileAvatar, setProfileName, setProfileOccupation } from './components/profile.js';
import { enableValidation } from './components/validation.js';
import { startLoader, endLoader } from './components/loader.js';
import deleteCardService from './components/deleteCardService.js';
import { createError } from './components/error.js';
import Api from './components/Api.js';

const cardDeletePopupForm = document.forms[FORM.NAME_DELETE];
let userId = localStorage.getItem('userId') || null;

addProfileListeners();
cardDeletePopupForm.addEventListener(EVENT.SUBMIT, (e) => deleteCardService.delete(e));

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
  const api = new Api(config);

  api.getData()
    .then(([userData, cards]) => {
      console.log(userData, cards);
      setProfileAvatar(userData.avatar);
      setProfileName(userData.name);
      setProfileOccupation(userData.about);
      userId = userData._id;
      localStorage.setItem('userId', userId);
      cards
        .reverse()
        .forEach(card => {
          const cardClone = createCard(card, userId);
          prependCard(cardClone);
        });
      endLoader();
    })
    .catch((error) => createError(error.status, `Ошибка получения информации о пользователе.`));
  // Promise.all([getUser(), getCards()])
  //   .then(([userData, cards]) => {
  //     setProfileAvatar(userData.avatar);
  //     setProfileName(userData.name);
  //     setProfileOccupation(userData.about);
  //     userId = userData._id;
  //     localStorage.setItem('userId', userId);
  //     cards
  //       .reverse()
  //       .forEach(card => {
  //         const cardClone = createCard(card, userId);
  //         prependCard(cardClone);
  //       });
  //     endLoader();
  //   })
  //   .catch((error) => createError(error.status, `Ошибка получения информации о пользователе.`));
});
