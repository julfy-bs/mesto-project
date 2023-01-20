import { KEY, POPUP } from './enum.js';

const addPopupActiveClass = (el) => {
  el.classList.add(POPUP.ACTIVE_CLASS);
};

const removePopupActiveClass = (el) => {
  el.classList.remove(POPUP.ACTIVE_CLASS);
};

const removeListeners = (target) => {
  const el = target.closest('.popup');
  el.removeEventListener('keydown', handlePopupKeyboardEvent);
  el.removeEventListener('mousedown', handlePopupMouseEvent);
};

const closePopup = (el) => {
  removePopupActiveClass(el);
  removeListeners(el);
};

const handlePopupMouseEvent = (e) => {
  const popup = e.target.closest('.popup');
  const closeCondition = e.target.classList.contains(POPUP.CLASSNAME)
    || e.target.classList.contains(POPUP.CLOSE_CLASSNAME);
  if (closeCondition) {
    closePopup(popup);
  }
};

const handlePopupKeyboardEvent = (e) => {
  if (e.key === KEY.ESCAPE) {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  }
};

const openPopup = (el) => {
  addPopupActiveClass(el);
  el.addEventListener('keydown', handlePopupKeyboardEvent);
  el.addEventListener('click', handlePopupMouseEvent);
  setTimeout(() => el.focus(), POPUP.ANIMATION_DURATION);
};

export {
  closePopup,
  openPopup
};
