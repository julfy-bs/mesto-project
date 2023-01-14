const POPUP_ACTIVE_CLASS = 'popup_active';
const POPUP_ANIMATION_DURATION = 200;
const KEY_ESCAPE = 'Escape';

const addPopupActiveClass = (el) => {
  el.classList.add(POPUP_ACTIVE_CLASS);
};

const removePopupActiveClass = (el) => {
  el.classList.remove(POPUP_ACTIVE_CLASS);
};

const removeListenerHandler = (target) => {
  const el = target.closest('.popup');
  el.removeEventListener('keydown', handlePopupKeyboardEvent);
  el.removeEventListener('mousedown', handlePopupMouseEvent);
};

export const closePopup = (el) => {
  removePopupActiveClass(el);
  removeListenerHandler(el);
};

const handlePopupMouseEvent = (e) => {
  const closeCondition = e.target.classList.contains('popup') || e.target.classList.contains('popup__close');
  if (closeCondition) {
    closePopup(e.target);
  }
};

const handlePopupKeyboardEvent = (e) => {
  if (e.key === KEY_ESCAPE) {
    closePopup(e.target);
  }
};

export const openPopup = (el) => {
  addPopupActiveClass(el);
  el.addEventListener('keydown', handlePopupKeyboardEvent);
  el.addEventListener('click', handlePopupMouseEvent);
  setTimeout(() => el.focus(), POPUP_ANIMATION_DURATION);
};
