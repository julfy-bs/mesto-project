import { openPopup } from '../helpers/openPopup.js';
import { closePopup } from '../helpers/closePopup.js';

export const popupPhoto = () => {
  const photoArray = document.querySelectorAll('.card__image')
  const popupPhoto = document.querySelector('.popup_type_photo');
  const popupClose = popupPhoto.querySelector('.popup__close');

  const photoArrayListener = (item) => {
    item.addEventListener('click', () => {
      openPopup(popupPhoto)
    })
  }
  const popupPhotoListener = (e) => {
    if (e.target === popupPhoto || e.target === popupClose) closePopup(popupPhoto);
  };

  photoArray.forEach(item => photoArrayListener(item))
  popupPhoto.addEventListener('click', popupPhotoListener);
}
