import { endLoader, startLoader } from './loader.js';
import { enableValidation } from './validation.js';
import { config, EVENT, FORM, PROFILE, VALIDATION } from './enum.js';
import Api from './Api.js';
import Card from './Card.js';
import Error from './Error.js';
import Profile from './Profile.js';
import deleteCardService from './deleteCardService.js';
const cardDeletePopupForm = document.forms[FORM.NAME_DELETE];

export default class App {
  constructor() {
    this._errorsHistory = [];
    this._api = new Api(config);


    this.startApp();
  }

  startApp() {
    startLoader();

    this._api.getAppData()
      .then(([userData, cards]) => {
        const user = new Profile({
          nameSelector: PROFILE.CONTENT_NAME,
          occupationSelector: PROFILE.CONTENT_OCCUPATION,
          avatarSelector: PROFILE.CONTENT_AVATAR
        });
        user.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar, id: userData._id });
        cards
          .reverse()
          .forEach(card => {
            const cardClone = new Card({
              name: card.name,
              link: card.link,
              owner: card.owner,
              likes: card.likes,
              id: card._id
            }, user.getUserId());
            // createCard(card, user.getUserId())
            // prependCard(cardClone);
          });
        endLoader();
        enableValidation({
          formSelector: VALIDATION.FORM_SELECTOR,
          inputSelector: VALIDATION.INPUT_SELECTOR,
          buttonSelector: VALIDATION.BUTTON_SELECTOR,
          errorSelector: VALIDATION.ERROR_SELECTOR,
          inputErrorClass: VALIDATION.INPUT_ERROR_CLASS,
          buttonDisabledClass: VALIDATION.BUTTON_DISABLED_CLASS,
          errorActiveClass: VALIDATION.ERROR_ACTIVE_CLASS
        });
        cardDeletePopupForm.addEventListener(EVENT.SUBMIT, (e) => deleteCardService.delete(e));

      })
      .catch((e) => {
        console.log(e);
        new Error(this._errorsHistory, { code: e, body: `Ошибка получения информации о пользователе.` })
      });
  }
}
