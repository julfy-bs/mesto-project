import { EVENT, FORM, KEY, POPUP } from './enum.js';

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
  const closeCondition = e.target.classList.contains(POPUP.CLASSNAME)
    || e.target.classList.contains(POPUP.CLOSE_CLASSNAME);
  if (closeCondition) {
    const popup = e.target.closest('.popup');
    closePopup(popup);
  }
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

const renderLoading = (isLoading, button, buttonText, loadingText) => {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
};

const handleSubmit = (request, e, mainErrorText = 'запроса', buttonText = FORM.BUTTON_TEXT_SAVE, loadingText = FORM.BUTTON_TEXT_SAVING) => {
  e.preventDefault();
  const popup = e.target.closest(POPUP.SELECTOR);
  const popupFormSubmitButton = e.submitter;
  renderLoading(true, popupFormSubmitButton, buttonText, loadingText);
  request()
    .then(() => {
      e.target.reset();
      closePopup(popup);
    })
    .catch((error) => console.error(`Ошибка ${error.status} ${mainErrorText} ${error.statusText}`))
    .finally(() => renderLoading(false, popupFormSubmitButton, buttonText, loadingText));
};

function addPopupEventListeners(popup) {
  popup.addEventListener(EVENT.MOUSEDOWN, handlePopupMouseEvent);
  popup.addEventListener(EVENT.KEYDOWN, handlePopupKeyboardEvent);
}

function removePopupEventListeners(popup) {
  popup.removeEventListener(EVENT.MOUSEDOWN, handlePopupMouseEvent);
  popup.removeEventListener(EVENT.KEYDOWN, handlePopupKeyboardEvent);
}

export {
  closePopup,
  openPopup,
  renderLoading,
  handleSubmit,
};
