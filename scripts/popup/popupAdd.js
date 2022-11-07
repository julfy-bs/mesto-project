import { openPopup } from '../helpers/openPopup.js';
import { closePopup } from '../helpers/closePopup.js';

export const popupAdd = () => {
  const addButton = document.querySelector('.profile__add');
  const popupAdd = document.querySelector('.popup-add');
  const popupClose = popupAdd.querySelector('.popup__close');
  const popupForm = popupAdd.querySelector('.form');
  const profileAddTitleInput = popupForm.querySelector('[name=\'title\']');


  addButton.addEventListener('click', () => {
    openPopup(popupAdd);
    profileAddTitleInput.focus();
  });

  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  popupAdd.addEventListener('click', (e) => {
    if (e.target === popupAdd || e.target === popupClose) closePopup(popupAdd);
  });
}
