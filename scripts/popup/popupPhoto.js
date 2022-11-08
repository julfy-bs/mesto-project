import { openPopup } from '../helpers/openPopup.js';
import { closePopup } from '../helpers/closePopup.js';

export const popupPhoto = (image, title) => {
  const popup = {
    photo: document.querySelector('.popup_type_photo'),
    close: document.querySelector('.popup__close'),
    image: document.querySelector('.popup__image'),
    title: document.querySelector('.popup__figcaption')
  };

  const imageListener = () => {
    openPopup(popup.photo);
    popup.title.textContent = title.textContent;
    popup.image.setAttribute('src', image.getAttribute('src'));
  };
  const popupPhotoListener = (e) => {
    if (e.target === popup.photo || e.target === popup.close) closePopup(popup.photo);
  };

  image.addEventListener('click', imageListener);
  popup.photo.addEventListener('click', popupPhotoListener);
};
