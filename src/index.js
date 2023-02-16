import './styles/pages/index.css';
import Api from './components/Api.js';
import { CARD, config, POPUP, PROFILE, VALIDATION } from './components/enum.js';
import { endLoader, startLoader } from './components/loader.js';
import Profile from './components/Profile.js';
import Section from './components/Section.js';
import Card from './components/Card.js';
import { enableValidation } from './components/validation.js';
import Error from './components/Error.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

document.addEventListener('DOMContentLoaded', () => {
  const api = new Api(config);
  const deleteSubmitHandler = async (card, popup) => {
    try {
      const { id } = card.getData();
      await api.removeCard(id);
      card.remove();
      popup.close();
    } catch (e) {
      const { name } = card.getData();
      new Error({ code: e, body: `Произошла ошибка при попытке удалить карточку \u00ab${name}\u00bb.` });
    }
  };
  const handleLike = async (card) => {
    try {
      const { id, hasOwnerLike } = card.getData();
      const newCard = await api.toggleLike(id, hasOwnerLike);
      card.toggleLike(newCard);
    } catch (e) {
      const { name, hasOwnerLike } = card.getData();
      let verb;
      (hasOwnerLike) ? verb = 'снять' : verb = 'добавить';
      new Error({ code: e, body: `Произошла ошибка при попытке ${verb} лайк карточке \u00ab${name}\u00bb.` });
    }
  };
  const handleDelete = (card) => {
    const popup = new PopupWithForm(POPUP.TYPE_DELETE);
    popup.open();
    popup.updateSubmitHandler(() => deleteSubmitHandler(card, popup));
  };
  const handleImage = (card) => {
    const { name, link } = card.getData();
    const popup = new PopupWithImage(POPUP.TYPE_PHOTO, POPUP.IMAGE, POPUP.TITLE);
    popup.fill({ name, link });
    popup.open();
  };
  const renderCards = (data, user, section) => {
    const cardClone = new Card({
      selector: CARD.TEMPLATE,
      card: {
        id: data._id,
        likes: data.likes,
        link: data.link,
        name: data.name,
        owner: data.owner
      },
      userId: user.getUserId(),
      handleLikeBtnClick: () => handleLike(cardClone),
      handleDeleteBtnClick: () => handleDelete(cardClone),
      handleImageClick: () => handleImage(cardClone)
    });
    const cardItem = cardClone.generate();
    section.prepend(cardItem);
  };
  const createUser = () => {
    return new Profile({
      nameSelector: PROFILE.CONTENT_NAME,
      occupationSelector: PROFILE.CONTENT_OCCUPATION,
      avatarSelector: PROFILE.CONTENT_AVATAR,
      avatarButtonSelector: PROFILE.AVATAR,
      editButtonSelector: PROFILE.BUTTON_EDIT_PROFILE,
      addCardButtonSelector: PROFILE.BUTTON_ADD_CARD
    });
  };
  const fillUserFields = (user, userData) => {
    user.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      id: userData._id
    });
  };
  const createFeed = (cards, user) => {
    const section = new Section(
      {
        data: cards,
        renderer: (card) => renderCards(card, user, section),
        containerSelector: CARD.WRAPPER
      }
    );
    return section;
  };
  const handleProfileAvatarSubmit = async (popup, user) => {
    try {
      const avatar = popup.getInputValue('link');
      await api.updateUserAvatar(avatar);
      user.setUserInfo({ avatar });
      popup.close();
    } catch (e) {
      const { name } = user.getUserInfo();
      new Error({
        code: e,
        body: `Произошла ошибка при попытке изменить изображение профиля пользователя \u00ab${name}\u00bb.`
      });
    }
  }
  const handleProfileAvatarButtonClick = (user) => {
    const popup = new PopupWithForm(POPUP.TYPE_AVATAR);
    popup.open();
    popup.updateSubmitHandler(() => handleProfileAvatarSubmit(popup, user));
  }
  const handleProfileEditSubmit = async (popup, user) => {
    try {
      const name = popup.getInputValue('name');
      const occupation = popup.getInputValue('occupation');

      const response = await api.updateUser({ name: name, about: occupation });
      user.setUserInfo({ name: response.name, about: response.about });
      popup.close();
    } catch (e) {
      const { name } = user.getUserInfo();
      new Error({
        code: e,
        body: `Произошла ошибка при попытке изменить имя или описание профиля пользователя \u00ab${name}\u00bb.`
      });
    }
  }
  const handleProfileEditButtonClick = (user) => {
    const { name, about } = user.getUserInfo();
    const popup = new PopupWithForm(POPUP.TYPE_PROFILE);
    popup.fillInputs({ name: name, occupation: about });
    popup.open();
    popup.updateSubmitHandler(() => handleProfileEditSubmit(popup, user));
  }
  const handleAddCardSubmit = async (popup, user, cardsFeed) => {
    try {
      const title = popup.getInputValue('title');
      const link = popup.getInputValue('link');

      const response = await api.addCard({ name: title, link: link });
      const card = new Card({
        selector: CARD.TEMPLATE,
        card: {
          id: response._id,
          likes: response.likes,
          link: response.link,
          name: response.name,
          owner: response.owner
        },
        userId: user.getUserId(),
        handleLikeBtnClick: () => handleLike(card),
        handleDeleteBtnClick: () => handleDelete(card),
        handleImageClick: () => handleImage(card)
      })
      const cardItem = card.generate();
      cardsFeed.prepend(cardItem);
      popup.close();
    } catch (e) {
      const { name } = user.getUserInfo();
      new Error({
        code: e,
        body: `Произошла ошибка при создании новой карточки для профиля \u00ab${name}\u00bb.`
      });
    }
  }
  const handleAddCardButtonClick = (user, cardsFeed) => {
    const popup = new PopupWithForm(POPUP.TYPE_CARD);
    popup.open();
    popup.updateSubmitHandler(async () => handleAddCardSubmit(popup, user, cardsFeed));
  }
  const startApp = async () => {
    try {
      startLoader();
      const [userData, cards] = await api.getAppData();
      const user = createUser();
      fillUserFields(user, userData);
      const cardsFeed = createFeed(cards, user);
      cardsFeed.render();
      user.addAvatarListener(() => handleProfileAvatarButtonClick(user));
      user.addEditButtonListener(() => handleProfileEditButtonClick(user));
      user.addNewCardButtonListener(() => handleAddCardButtonClick(user, cardsFeed));
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
    } catch (e) {
      new Error({ code: e, body: `Ошибка получения информации с сервера.` });
    }
  };
  startApp();
});
