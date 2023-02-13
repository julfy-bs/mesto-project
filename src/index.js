import './styles/pages/index.css';
import Api from './components/Api.js';
import { CARD, config, PROFILE, VALIDATION } from './components/enum.js';
import { endLoader, startLoader } from './components/loader.js';
import Profile from './components/Profile.js';
import Section from './components/Section.js';
import Card from './components/Card.js';
import { enableValidation } from './components/validation.js';
import Error from './components/Error.js';

document.addEventListener('DOMContentLoaded', () => {
  const api = new Api(config);

  const handleLikeBtnClick = async (card) => {
    try {
      const { id, hasOwnerLike } = card.getData();
      const newCard = await api.toggleLike(id, hasOwnerLike);
      card.toggleLike(newCard);
    } catch (e) {
      new Error({ code: e, body: `При попытке поставить лайк произошла ошибка.` });
    }
  };
  const handleDeleteBtnClick = () => {
  };
  const handleImageClick = () => {
  };

  const startApp = () => {
    startLoader();

    api.getAppData()
      .then(([userData, cards]) => {
        const user = new Profile({
          nameSelector: PROFILE.CONTENT_NAME,
          occupationSelector: PROFILE.CONTENT_OCCUPATION,
          avatarSelector: PROFILE.CONTENT_AVATAR
        });
        user.setUserInfo({ name: userData.name, about: userData.about, avatar: userData.avatar, id: userData._id });
        const cardsFeed = new Section(
          cards,
          (cardData) => {
            const cardClone = new Card(
              CARD.TEMPLATE,
              {
                name: cardData.name,
                link: cardData.link,
                owner: cardData.owner,
                likes: cardData.likes,
                id: cardData._id
              },
              user.getUserId(),
              handleLikeBtnClick,
              handleDeleteBtnClick,
              handleImageClick);
            const cardItem = cardClone.generate();
            cardsFeed.prepend(cardItem);
          },
          CARD.WRAPPER,
        );
        cardsFeed.render();
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
        // cardDeletePopupForm.addEventListener(EVENT.SUBMIT, (e) => deleteCardService.delete(e));

      })
      .catch((e) => {
        console.log(e);
        new Error({ code: e, body: `Ошибка получения информации о пользователе.` });
      });
  };

  startApp();
});
