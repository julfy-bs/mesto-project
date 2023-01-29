import { EVENT, FORM, KEY, POPUP, VALIDATION } from './enum.js';
import deleteCardService from './deleteCardService.js';

const addPopupActiveClass = (popup) => {
  popup.classList.add(POPUP.ACTIVE_CLASS);
};

const removePopupActiveClass = (popup) => {
  popup.classList.remove(POPUP.ACTIVE_CLASS);
};

const closePopup = (popup) => {
  removePopupActiveClass(popup);
  removePopupEventListeners(popup);
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

const openPopup = (popup) => {
  addPopupActiveClass(popup);
  addPopupEventListeners(popup);
  setTimeout(() => popup.focus(), POPUP.ANIMATION_DURATION);
};

const changeButtonText = (form, text = FORM.BUTTON_TEXT_SAVING) => {
  const submitButtonText = form.querySelector(VALIDATION.BUTTON_SELECTOR);
  submitButtonText.textContent = text;
};

const addDeletePopupSubmitListener = (form) => {
  form.addEventListener(EVENT.SUBMIT, (e) => {
    e.preventDefault();
    if (typeof deleteCardService.delete === 'function') deleteCardService.delete();
  });
};

function addPopupEventListeners(popup) {
  popup.addEventListener('mousedown', handlePopupMouseEvent);
  popup.addEventListener('keydown', handlePopupKeyboardEvent);
}

function removePopupEventListeners(popup) {
  popup.removeEventListener(EVENT.MOUSEDOWN, handlePopupMouseEvent);
  popup.removeEventListener(EVENT.KEYDOWN, handlePopupKeyboardEvent);
}

export {
  closePopup,
  openPopup,
  changeButtonText,
  addDeletePopupSubmitListener
};
