import { KEY, POPUP, VALIDATION } from './enum.js';

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
  if (closeCondition) closePopup(popup);
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
  el.addEventListener('mousedown', handlePopupMouseEvent);
  setTimeout(() => el.focus(), POPUP.ANIMATION_DURATION);
};

const changeButtonText = (form, text = POPUP.BUTTON_TEXT_SAVING) => {
  const submitButtonText = form.querySelector(VALIDATION.BUTTON_SELECTOR);
  submitButtonText.textContent = text;
  // const loadingEllipsis = button.querySelector();
  // loadingEllipsis.classList.remove(ellipsisClass);
}

export {
  closePopup,
  openPopup,
  changeButtonText
};
