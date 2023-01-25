const KEY = {
  ESCAPE: 'Escape'
};

const VALIDATION = {
  FORM_SELECTOR: '.form',
  INPUT_SELECTOR: '.form__input',
  BUTTON_SELECTOR: '.form__button',
  ERROR_SELECTOR: '.form__error',
  INPUT_ERROR_CLASS: 'form__input_type_error',
  BUTTON_DISABLED_CLASS: 'form__button_type_disabled',
  ERROR_ACTIVE_CLASS: 'form__error_active'
};

const PROFILE = {
  FORM: '.form',
  FORM_PROFILE: 'profile',
  FORM_CARD: 'card',
  INPUT_NAME: '[name="name"]',
  INPUT_OCCUPATION: '[name="occupation"]',
  CONTENT_NAME: '.profile__name',
  CONTENT_OCCUPATION: '.profile__occupation',
  CONTENT_AVATAR: '.profile__image',
  BUTTON_EDIT: '.profile__edit',
  BUTTON_ADD: '.profile__add',
};

const POPUP = {
  CLASSNAME: 'popup',
  CLOSE_CLASSNAME: 'popup__close',
  ACTIVE_CLASS: 'popup_active',
  ANIMATION_DURATION: 200,
  PROFILE: '.popup_type_edit',
  CARD: '.popup_type_add',
  PHOTO: '.popup_type_photo',
  IMAGE: '.popup__image',
  TITLE: '.popup__figcaption',
  FORM: '.form',
  INPUT_TITLE: '[name="title"]',
  INPUT_LINK: '[name="link"]'
};

const CARD = {
  WRAPPER: '.feed__list',
  TEMPLATE: '#card',
  ITEM: '.feed__item',
  ITEM_CLASSNAME: 'feed__item',
  ARTICLE: '.card',
  IMAGE: '.card__image',
  TITLE: '.card__title',
  LIKE_BUTTON: '.card__like-button',
  LIKE_NUMBER: '.card__like-number',
  LIKE_BUTTON_ACTIVE: 'card__like-button_active',
  LIKE_BUTTON_IS_LIKED: 'card__like-button_liked_true',
  DELETE: '.card__delete'
};

export {
  CARD,
  KEY,
  POPUP,
  PROFILE,
  VALIDATION
};
