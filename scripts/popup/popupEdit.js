import { closePopup } from '../helpers/closePopup.js';
import { openPopup } from '../helpers/openPopup.js';

export const popupEdit = () => {
  const profileEditButton = document.querySelector('.profile__edit');
  const popupEdit = document.querySelector('.popup-edit');
  const closeButton = popupEdit.querySelector('.popup-edit__close');
  const profileEditNameInput = popupEdit.querySelector('[name=\'name\']');
  const profileEditOccupationInput = popupEdit.querySelector('[name=\'occupation\']');
  const profileEditNameTemplate = document.querySelector('.profile__name');
  const profileEditOccupationTemplate = document.querySelector('.profile__occupation');
  const popupEditForm = popupEdit.querySelector('.form');

  profileEditButton.addEventListener('click', () => {
    openPopup(popupEdit, 'popup-edit_active');
    profileEditNameInput.value = profileEditNameTemplate.textContent;
    profileEditOccupationInput.value = profileEditOccupationTemplate.textContent;
    // Если focus() - не оптимальное решение, то как исправить баг, что при открытии модального окна при нажатии на 'Tab' фокус работает в первую очередь по всей странице, а не внутри модального окна. Нужно ли вообще ограничивать действие фокуса внутри модального окна?
    profileEditNameInput.focus();
  });

  popupEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profileEditNameTemplate.textContent = profileEditNameInput.value;
    profileEditOccupationTemplate.textContent = profileEditOccupationInput.value;
    closePopup(popupEdit, 'popup-edit_active');
  });

  popupEdit.addEventListener('click', (e) => {
    if (e.target === popupEdit || e.target === closeButton) closePopup(popupEdit, 'popup-edit_active');
  });
};
