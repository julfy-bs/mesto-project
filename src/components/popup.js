import { KEY, POPUP, VALIDATION } from './enum.js';

const addPopupActiveClass = (el) => {
  el.classList.add(POPUP.ACTIVE_CLASS);
};

const removePopupActiveClass = (el) => {
  el.classList.remove(POPUP.ACTIVE_CLASS);
};

const addPopupEventListeners = (popup) => {
  popup.addEventListener('keydown', (e) => handlePopupKeyboardEvent(e));
  popup.addEventListener('mousedown', (e) => handlePopupMouseEvent(e));
};

const removePopupEventListeners = (popup) => {
  popup.removeEventListener('keydown', (e) => handlePopupKeyboardEvent(e));
  popup.removeEventListener('mousedown', (e) => handlePopupMouseEvent(e));
};

const closePopup = (popup) => {
  removePopupActiveClass(popup);
  removePopupEventListeners(popup);
};

const handlePopupMouseEvent = (e) => {
  const popup = e.target.closest('.popup');
  const closeCondition = e.target.classList.contains(POPUP.CLASSNAME)
    || e.target.classList.contains(POPUP.CLOSE_CLASSNAME);
  const popupType = popup.querySelector(POPUP.FORM) !== null;
  (popupType) ? closePopupWithForm(popup) : closePopup(popup);
  if (closeCondition) closePopup(popup);
};

const handlePopupKeyboardEvent = (e) => {
  if (e.key === KEY.ESCAPE) {
    const popup = e.target.closest('.popup');
    const popupType = popup.querySelector(POPUP.FORM) !== null;
    (popupType) ? closePopupWithForm(popup) : closePopup(popup);
  }
};

const openPopup = (popup) => {
  addPopupActiveClass(popup);
  addPopupEventListeners(popup);
  setTimeout(() => popup.focus(), POPUP.ANIMATION_DURATION);
};

const changeButtonText = (form, text = POPUP.BUTTON_TEXT_SAVING) => {
  const submitButtonText = form.querySelector(VALIDATION.BUTTON_SELECTOR);
  submitButtonText.textContent = text;
};

const closePopupWithForm = (popup, handleSubmit) => {
  closePopup(popup);
  const form = popup.querySelector(POPUP.FORM);
  form.removeEventListener('submit', handleSubmit);
};

const openPopupWithForm = (popup, handleSubmit) => {
  openPopup(popup);
  const form = popup.querySelector(POPUP.FORM);
  form.addEventListener('submit', handleSubmit);
};

export {
  closePopup,
  openPopup,
  changeButtonText,
  closePopupWithForm,
  openPopupWithForm
};
