export const likeCard = () => {
  const cardLikeButtons = document.querySelectorAll('.card__like');
  console.log(cardLikeButtons);
  const likeCardListener = (item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('card__like_active')
      if (item.classList.contains('card__like_active')) {
        item.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"')
      } else {
        item.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"')
      }
    })
  }

  cardLikeButtons.forEach(item => likeCardListener(item))
};
