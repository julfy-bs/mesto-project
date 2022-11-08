import { closePopup } from '../helpers/closePopup.js';
import { openPopup } from '../helpers/openPopup.js';

export const popupEdit = () => {
  const editButton = document.querySelector('.profile__edit');
  const popupEdit = document.querySelector('.popup-edit');
  const popupClose = popupEdit.querySelector('.popup__close');
  const popupForm = popupEdit.querySelector('.form');
  const nameInput = popupForm.querySelector('[name=\'name\']');
  const occupationInput = popupForm.querySelector('[name=\'occupation\']');
  const nameContent = document.querySelector('.profile__name');
  const occupationContent = document.querySelector('.profile__occupation');

  const editButtonListener = () => {
    openPopup(popupEdit);
    nameInput.value = nameContent.textContent;
    occupationInput.value = occupationContent.textContent;
  };
  const popupFormListener = (e) => {
    e.preventDefault();
    nameContent.textContent = nameInput.value;
    occupationContent.textContent = occupationInput.value;
    closePopup(popupEdit);
  };
  const popupEditListener = (e) => {
    if (e.target === popupEdit || e.target === popupClose) closePopup(popupEdit);
  };

  editButton.addEventListener('click', editButtonListener);
  popupForm.addEventListener('submit', popupFormListener);
  popupEdit.addEventListener('click', popupEditListener);
};
