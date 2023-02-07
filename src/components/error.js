import { ERROR, EVENT } from './enum.js';

const errorTemplate = document.querySelector(ERROR.TEMPLATE).content.querySelector(ERROR.SELECTOR);
const errorsWrapper = document.querySelector(ERROR.LIST);
const errorsMain = document.querySelector('.error');
const addErrorActiveClass = (el) => {
  el.classList.add(ERROR.ACTIVE_CLASS);
  console.log(el, errorsMain);
  errorsMain.classList.add('error_active');
};

const removeErrorActiveClass = (el) => {
  el.classList.remove(ERROR.ACTIVE_CLASS);
  errorsMain.classList.remove('error_active');
};

const closeButtonListener = (element) => {
  removeErrorActiveClass(element);
  setTimeout(() => element.remove(), 500)
}

export const createError = (code = 400, body = 'default') => {
  const errorItem = errorTemplate.cloneNode(true);
  const errorItemTitle = errorItem.querySelector(ERROR.TITLE);
  const errorItemBody = errorItem.querySelector(ERROR.DESCRIPTION);
  const errorItemButton = errorItem.querySelector(ERROR.BUTTON);
  addErrorActiveClass(errorItem);

  errorItemButton.addEventListener(EVENT.CLICK, () => closeButtonListener(errorItem));

  errorItemTitle.textContent = `Код ${code}`;
  errorItemBody.textContent = body;

  errorsWrapper.prepend(errorItem);
  return errorItem;
};
