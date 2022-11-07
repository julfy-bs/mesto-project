import { openPopup } from '../helpers/openPopup.js';
import { closePopup } from '../helpers/closePopup.js';
import { addCard } from '../cards/addCard.js';
import { createCard } from '../helpers/createCard.js';

export const popupAdd = () => {
  const addButton = document.querySelector('.profile__add');
  const popupAdd = document.querySelector('.popup-add');
  const popupClose = popupAdd.querySelector('.popup__close');
  const popupForm = popupAdd.querySelector('.form');
  const titleInput = popupForm.querySelector('[name=\'title\']');
  const linkInput = popupForm.querySelector('[name=\'link\']');

  const addButtonListener = () => {
    openPopup(popupAdd);
    titleInput.focus();
  };
  const popupFormListener = (e) => {
    e.preventDefault();
    const card = {
      name: titleInput.value,
      image: linkInput.value
    };
    addCard(card);
    createCard(card);
    closePopup(popupAdd);
  };
  const popupAddListener = (e) => {
    if (e.target === popupAdd || e.target === popupClose) closePopup(popupAdd);
  };

  addButton.addEventListener('click', addButtonListener);
  popupForm.addEventListener('submit', popupFormListener);
  popupAdd.addEventListener('click', popupAddListener);
};
