import { openPopup } from '../helpers/openPopup.js';
import { closePopup } from '../helpers/closePopup.js';
import Card from '../cards/Card.js';
import { addCard } from '../helpers/addCard.js';

export const popupAdd = () => {
  const addButton = document.querySelector('.profile__add');
  const popupAdd = document.querySelector('.popup-add');
  const popupClose = popupAdd.querySelector('.popup__close');
  const popupForm = popupAdd.querySelector('.form');
  const titleInput = popupForm.querySelector('[name=\'title\']');
  const linkInput = popupForm.querySelector('[name=\'link\']');

  const addButtonListener = () => {
    openPopup(popupAdd);
  };
  const popupFormListener = (e) => {
    e.preventDefault();
    const card = {
      title: titleInput.value,
      image: linkInput.value
    };
    new Card(card);
    addCard(card);
    closePopup(popupAdd);
    titleInput.value = '';
    linkInput.value = '';
  };
  const popupAddListener = (e) => {
    if (e.target === popupAdd || e.target === popupClose) closePopup(popupAdd);
  };

  addButton.addEventListener('click', addButtonListener);
  popupForm.addEventListener('submit', popupFormListener);
  popupAdd.addEventListener('click', popupAddListener);
};
