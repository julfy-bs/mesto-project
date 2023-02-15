export default class Profile {
  constructor({ nameSelector, occupationSelector, avatarSelector }) {
    this._profileNameElement = document.querySelector(nameSelector);
    this._profileAboutElement = document.querySelector(occupationSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      about: this._profileAboutElement.textContent
    };
  }

  setUserInfo(userData) {
    const { name, about, avatar, id } = userData;
    console.log({ name, about, avatar, id });
    this._profileNameElement.textContent = name;
    this._profileAboutElement.textContent = about;
    this._profileAvatarElement.src = avatar;
    this._userId = id;
  }

  updateUserInfo({ name, about }) {
    this._profileNameElement.textContent = name;
    this._profileAboutElement.textContent = about;
  }

  updateUserAvatar({ avatar }) {
    this._profileAvatarElement.src = avatar;
  }

  getUserId() {
    return this._userId;
  }
}


// import { openPopup, handleSubmit } from './popup-old.js';
// import { createCard, prependCard } from './Card.js';
// import { PROFILE, POPUP, FORM, EVENT } from './enum.js';
//
// const avatarPopup = document.querySelector(POPUP.TYPE_AVATAR);
// const avatarPopupOpenButton = document.querySelector(PROFILE.AVATAR);
// const avatarPopupForm = document.forms[FORM.NAME_AVATAR];
// const avatarPopupLinkInput = avatarPopupForm.querySelector(FORM.INPUT_LINK);
// const profilePopup = document.querySelector(POPUP.TYPE_PROFILE);
// const profileName = document.querySelector(PROFILE.CONTENT_NAME);
// const profileAvatar = document.querySelector(PROFILE.CONTENT_AVATAR);
// const profileOccupation = document.querySelector(PROFILE.CONTENT_OCCUPATION);
// const profilePopupOpenButton = document.querySelector(PROFILE.BUTTON_EDIT_PROFILE);
// const profilePopupForm = document.forms[FORM.NAME_PROFILE];
// const profilePopupNameInput = profilePopupForm.querySelector(FORM.INPUT_NAME);
// const profilePopupOccupationInput = profilePopupForm.querySelector(FORM.INPUT_OCCUPATION);
// const cardPopup = document.querySelector(POPUP.TYPE_CARD);
// const cardPopupOpenButton = document.querySelector(PROFILE.BUTTON_ADD_CARD);
// const cardPopupForm = document.forms[FORM.NAME_CARD];
// const cardPopupTitleInput = cardPopupForm.querySelector(FORM.INPUT_TITLE);
// const cardPopupLinkInput = cardPopupForm.querySelector(FORM.INPUT_LINK);
//
// const fillProfileInputs = () => {
//   profilePopupNameInput.value = profileName.textContent;
//   profilePopupOccupationInput.value = profileOccupation.textContent;
// };
//
// const setProfileAvatar = (src) => {
//   profileAvatar.setAttribute('src', src);
// };
//
// const setProfileName = (name) => {
//   profileName.textContent = name;
// };
//
// const setProfileOccupation = (occupation) => {
//   profileOccupation.textContent = occupation;
// };
//
// const handleAvatarFormSubmit = (e) => {
//   const submitAvatarRequest = () => {
//     const avatar = avatarPopupLinkInput.value;
//     return updateUserAvatar(avatar)
//       .then((userData) => {
//         setProfileAvatar(userData.avatar);
//       });
//   };
//   handleSubmit(submitAvatarRequest, e, 'изменения аватара пользователя');
// };
//
// const handleOpenAvatar = () => {
//   openPopup(avatarPopup);
// };
//
// const handleProfileFormSubmit = (e) => {
//   const user = { name: profilePopupNameInput.value, about: profilePopupOccupationInput.value };
//   const submitProfileRequest = () => {
//     return updateUser(user)
//       .then((userData) => {
//         setProfileName(userData.name);
//         setProfileOccupation(userData.about);
//       });
//   };
//   handleSubmit(submitProfileRequest, e, 'редактирования информации профиля');
// };
//
// const handleOpenProfile = () => {
//   openPopup(profilePopup);
//   fillProfileInputs();
// };
//
// const handleCardFormSubmit = (e) => {
//   const submitCardFormRequest = () => {
//     const card = { name: cardPopupTitleInput.value, link: cardPopupLinkInput.value };
//     return addCard(card)
//       .then((card) => {
//         const cardClone = createCard(card, card.owner._id);
//         prependCard(cardClone);
//       });
//   };
//   handleSubmit(submitCardFormRequest, e, 'cоздания карточки');
//
// };
//
// const handleCardPopupOpenButton = () => {
//   openPopup(cardPopup);
// };
//
// const addProfileListeners = () => {
//   cardPopupOpenButton.addEventListener(EVENT.CLICK, handleCardPopupOpenButton);
//   cardPopupForm.addEventListener(EVENT.SUBMIT, handleCardFormSubmit);
//   profilePopupOpenButton.addEventListener(EVENT.CLICK, handleOpenProfile);
//   profilePopupForm.addEventListener(EVENT.SUBMIT, handleProfileFormSubmit);
//   avatarPopupOpenButton.addEventListener(EVENT.CLICK, handleOpenAvatar);
//   avatarPopupForm.addEventListener(EVENT.SUBMIT, handleAvatarFormSubmit);
// };
//
// export {
//   addProfileListeners,
//   setProfileAvatar,
//   setProfileName,
//   setProfileOccupation
// };
