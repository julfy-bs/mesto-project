import './styles/pages/index.css';
import Api from './components/Api.js';
import { CARD, apiConfig, validationConfig, POPUP, PROFILE, LOADER, EVENT, ERROR } from './components/enum.js';
import Loader from './components/Loader.js';
import Profile from './components/Profile.js';
import Section from './components/Section.js';
import Card from './components/Card.js';
import Validation from './components/Validation.js';
import Error from './components/Error.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

document.addEventListener('DOMContentLoaded', () => {
  const api = new Api(apiConfig);
  const errorList = new Section({
    renderer: (error) => renderCards(error, errorList),
    containerSelector: ERROR.LIST
  });
  const ProfileAvatarForm = new Validation('.form_type_avatar', validationConfig);
  ProfileAvatarForm.enableValidation();
  const ProfileEditForm = new Validation('.form_type_edit', validationConfig);
  ProfileEditForm.enableValidation();
  const ProfileAddCardForm = new Validation('.form_type_add', validationConfig);
  ProfileAddCardForm.enableValidation();

  const popupImageDetail = new PopupWithImage(POPUP.TYPE_PHOTO, POPUP.IMAGE, POPUP.TITLE);
  popupImageDetail.setEventListeners();
  const popupCardDelete = new PopupWithForm(POPUP.TYPE_DELETE);
  popupCardDelete.setEventListeners();
  const popupEditAvatar = new PopupWithForm(POPUP.TYPE_AVATAR);
  popupEditAvatar.setEventListeners();
  const popupEditProfile = new PopupWithForm(POPUP.TYPE_PROFILE);
  popupEditProfile.setEventListeners();
  const popupAddCard = new PopupWithForm(POPUP.TYPE_CARD);
  popupAddCard.setEventListeners();

  const deleteSubmitHandler = async (card, popup) => {
    try {
      const { id } = card.getData();
      await api.removeCard(id);
      card.remove();
      popup.close();
    } catch (e) {
      const { name } = card.getData();
      const error = new Error({ code: e, body: `Произошла ошибка при попытке удалить карточку \u00ab${name}\u00bb.` });
      error.createError();
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
      const error = new Error({
        code: e,
        body: `Произошла ошибка при попытке ${verb} лайк карточке \u00ab${name}\u00bb.`
      });
      error.createError();
    }
  };
  const handleDelete = (card) => {
    popupCardDelete.open();
    popupCardDelete.updateSubmitHandler(() => deleteSubmitHandler(card, popupCardDelete));
  };
  const handleImage = (card) => {
    const { name, link } = card.getData();
    popupImageDetail.open({ name, link });
  };
  const renderCards = (data, user, section) => {
    const { id } = user.getUserInfo();
    const cardClone = new Card({
      selector: CARD.TEMPLATE,
      card: {
        id: data._id,
        likes: data.likes,
        link: data.link,
        name: data.name,
        owner: data.owner
      },
      userId: id,
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
  const createFeed = (user) => {
    const section = new Section(
      {
        renderer: (card) => renderCards(card, user, section),
        containerSelector: CARD.WRAPPER
      }
    );
    return section;
  };
  const throwUserError = ({ code, body }) => {
    const errorItem = new Error({ code, body });
    errorList.prepend(errorItem.createError());
  };
  const handleProfileAvatarSubmit = async (popup, user) => {
    try {
      const avatar = popup.getInputValue('link');
      await api.updateUserAvatar(avatar);
      user.setUserInfo({ avatar });
      popup.close();
      popup.resetForm();
    } catch (e) {
      const { name } = user.getUserInfo();
      const error = new Error({
        code: e,
        body: `Произошла ошибка при попытке изменить изображение профиля пользователя \u00ab${name}\u00bb.`
      });
      error.createError();
    }
  };
  const handleProfileAvatarButtonClick = (user) => {
    popupEditAvatar.open();
    popupEditAvatar.updateSubmitHandler(() => handleProfileAvatarSubmit(popupEditAvatar, user));
  };
  const handleProfileEditSubmit = async (popup, user) => {
    try {
      const name = popup.getInputValue('name');
      const occupation = popup.getInputValue('occupation');
      const response = await api.updateUser({ name: name, about: occupation });
      user.setUserInfo({ name: response.name, about: response.about });
      popup.close();
      popup.resetForm();
    } catch (e) {
      const { name } = user.getUserInfo();
      const error = new Error({
        code: e,
        body: `Произошла ошибка при попытке изменить имя или описание профиля пользователя \u00ab${name}\u00bb.`
      });
      error.createError();
    }
  };
  const handleProfileEditButtonClick = (user) => {
    const { name, about } = user.getUserInfo();
    popupEditProfile.fillInputs({ name: name, occupation: about });
    popupEditProfile.open();
    popupEditProfile.updateSubmitHandler(() => handleProfileEditSubmit(popupEditProfile, user));
  };
  const handleAddCardSubmit = async (popup, user, cardsFeed) => {
    try {
      const title = popup.getInputValue('title');
      const link = popup.getInputValue('link');
      const { id } = user.getUserInfo();
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
        userId: id,
        handleLikeBtnClick: () => handleLike(card),
        handleDeleteBtnClick: () => handleDelete(card),
        handleImageClick: () => handleImage(card)
      });
      const cardItem = card.generate();
      cardsFeed.prepend(cardItem);
      popup.close();
      popup.resetForm();
    } catch (e) {
      const { name } = user.getUserInfo();
      const error = new Error({
        code: e,
        body: `Произошла ошибка при создании новой карточки для профиля \u00ab${name}\u00bb.`
      });
      error.createError();
    }
  };
  const handleAddCardButtonClick = (user, cardsFeed) => {
    popupAddCard.open();
    popupAddCard.updateSubmitHandler(async () => handleAddCardSubmit(popupAddCard, user, cardsFeed));
  };
  const setProfileButtonsListeners = (config) => {
    config.forEach((element) => {
      document
        .querySelector(element.selector)
        .addEventListener(EVENT.CLICK, element.handleClick);
    });
  };
  const startApp = async () => {
    try {
      const loader = new Loader(LOADER.SELECTOR, [PROFILE.CONTENT_NAME, PROFILE.CONTENT_OCCUPATION], [PROFILE.AVATAR]);
      loader.startLoader();
      const [userData, cards] = await api.getAppData();
      const user = createUser();
      fillUserFields(user, userData);
      const cardsFeed = createFeed(user);
      cardsFeed.render(cards);
      setProfileButtonsListeners([
        {
          selector: PROFILE.AVATAR,
          handleClick: () => handleProfileAvatarButtonClick(user),
        },
        {
          selector: PROFILE.BUTTON_EDIT_PROFILE,
          handleClick: () => handleProfileEditButtonClick(user),
        },
        {
          selector: PROFILE.BUTTON_ADD_CARD,
          handleClick: () => handleAddCardButtonClick(user, cardsFeed),
        },
      ]);
      loader.endLoader();
    } catch (e) {
      throwUserError({ code: e, body: `Ошибка получения информации с сервера.` });
    }
  };
  startApp();
});
