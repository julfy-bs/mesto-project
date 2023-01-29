const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '0f9e6763-ca59-4d6a-b788-b6c985602524',
    'Content-Type': 'application/json',
  },
};

const LOADER = {
  SELECTOR: '.loader',
  ACTIVE_CLASS: 'loader_active',
  SKELETON: 'loader__skeleton',
  SKELETON_TEXT: 'loader__skeleton_type_text'
}

const KEY = {
  ESCAPE: 'Escape'
};

const EVENT = {
  SUBMIT: 'submit',
  KEYDOWN: 'keydown',
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup'
}

const VALIDATION = {
  FORM_SELECTOR: '.form',
  INPUT_SELECTOR: '.form__input',
  INPUT_ERROR_CLASS: 'form__input_type_error',
  BUTTON_SELECTOR: '.form__button',
  BUTTON_DISABLED_CLASS: 'form__button_type_disabled',
  ERROR_SELECTOR: '.form__error',
  ERROR_ACTIVE_CLASS: 'form__error_active'
};

const PROFILE = {
  CONTENT_NAME: '.profile__name',
  CONTENT_OCCUPATION: '.profile__occupation',
  CONTENT_AVATAR: '.profile__image',
  BUTTON_EDIT_PROFILE: '.profile__edit',
  BUTTON_ADD_CARD: '.profile__add',
  AVATAR: '.profile__avatar',
};

const POPUP = {
  CLASSNAME: 'popup',
  CLOSE_CLASSNAME: 'popup__close',
  ACTIVE_CLASS: 'popup_active',
  ANIMATION_DURATION: 200,
  TYPE_PROFILE: '.popup_type_edit',
  TYPE_CARD: '.popup_type_add',
  TYPE_PHOTO: '.popup_type_photo',
  TYPE_AVATAR: '.popup_type_avatar',
  TYPE_DELETE: '.popup_type_delete',
  IMAGE: '.popup__image',
  TITLE: '.popup__figcaption',
};

const FORM = {
  SELECTOR: '.form',
  NAME_PROFILE: 'profile',
  NAME_CARD: 'card',
  NAME_DELETE: 'delete',
  NAME_AVATAR: 'avatar',
  INPUT_TITLE: '[name="title"]',
  INPUT_LINK: '[name="link"]',
  INPUT_NAME: '[name="name"]',
  INPUT_OCCUPATION: '[name="occupation"]',
  BUTTON_TEXT_SAVE: 'Сохранить',
  BUTTON_TEXT_CREATE: 'Создать',
  BUTTON_TEXT_SAVING: 'Сохранение...',
  BUTTON_TEXT_DELETING: 'Удаление...',
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
  EVENT,
  KEY,
  FORM,
  POPUP,
  PROFILE,
  LOADER,
  VALIDATION,
  config
};
