export const deleteCard = () => {
  const cardDeleteButtons = document.querySelectorAll('.card__delete');
  const cardDeleteButtonListener = (item) => {
    item.addEventListener('click', () => {
      const card = item.closest('.card').closest('li');
      card.remove();
    });
  };

  cardDeleteButtons.forEach(item => cardDeleteButtonListener(item));
};
