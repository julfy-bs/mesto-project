import './styles/pages/index.css';
import { config, EVENT, FORM, PROFILE, VALIDATION } from './components/enum.js';
import { createCard, prependCard } from './components/card.js';
import { enableValidation } from './components/validation.js';
import { startLoader, endLoader } from './components/loader.js';
import deleteCardService from './components/deleteCardService.js';
import { createError } from './components/error.js';
import Api from './components/Api.js';
import Profile from './components/Profile.js';

const cardDeletePopupForm = document.forms[FORM.NAME_DELETE];

// addProfileListeners();
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
      const user = new Profile({ nameSelector: PROFILE.CONTENT_NAME, occupationSelector: PROFILE.CONTENT_OCCUPATION, avatarSelector: PROFILE.CONTENT_AVATAR});
      user.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar, id: userData._id  })
      cards
        .reverse()
        .forEach(card => {
          const cardClone = createCard(card, user.getUserId());
          prependCard(cardClone);
        });
      endLoader();
    })
    .catch((error) => createError(error.status, `Ошибка получения информации о пользователе.`));
});
