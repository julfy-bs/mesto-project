import { KEY, POPUP, VALIDATION } from './enum.js';
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

const closePopupWithForm = (popup) => {
  closePopup(popup);
  const form = popup.querySelector(POPUP.FORM);
  form.removeEventListener('submit', deleteCardService.delete);
  console.log('popup leave');
};

const handlePopupMouseEvent = (e) => {
  const popup = e.target.closest('.popup');
  const closeCondition = e.target.classList.contains(POPUP.CLASSNAME)
    || e.target.classList.contains(POPUP.CLOSE_CLASSNAME);
  const hasForm = popup.querySelector(POPUP.FORM) !== null;
  if (closeCondition) (hasForm) ? closePopupWithForm(popup) : closePopup(popup)
};

const handlePopupKeyboardEvent = (e) => {
  if (e.key === KEY.ESCAPE) {
    const popup = e.target.closest('.popup');
    const hasForm = popup.querySelector(POPUP.FORM) !== null;
    (hasForm) ? closePopupWithForm(popup) : closePopup(popup);
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

const openPopupWithForm = (popup) => {
  console.log('popup enter');
  openPopup(popup);
  const form = popup.querySelector(POPUP.FORM);
  form.addEventListener('submit', deleteCardService.delete);
};

function addPopupEventListeners(popup) {
  popup.addEventListener('mousedown', handlePopupMouseEvent);
  popup.addEventListener('keydown', handlePopupKeyboardEvent);
}

function removePopupEventListeners(popup) {
  popup.removeEventListener('mousedown', handlePopupMouseEvent);
  popup.removeEventListener('keydown', handlePopupKeyboardEvent);
}

export {
  closePopup,
  openPopup,
  changeButtonText,
  closePopupWithForm,
  openPopupWithForm
};
