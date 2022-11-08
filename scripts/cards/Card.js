import { popupPhoto } from '../popup/popupPhoto.js';

export default class Card {
  constructor(card) {
    this.id = Date.now();
    this.title = card.title;
    this.image = card.image;

    try {
      this.createTemplate();
      this.cardElements = this.findListenerTargets();
      this.addListeners();
    } catch (e) {
      console.error(`Ошибка ${e.name} при создании карточки: ${e.message}`);
    }
  }

  createTemplate() {
    const cardsWrapper = document.querySelector('.feed__list');
    const cardTemplate = `
    <li class="feed__item" data-id="${this.id}">
      <article class="card">
        <img src="${this.image}"
             alt="${this.title}"
             class="card__image"/>
        <button class="button card__delete" type="button" aria-label="Удалить"></button>
        <div class="card__footer">
          <h2 class="card__title">${this.title}</h2>
          <button class="button card__like" type="button" aria-label="Добавить отметку &#34;Понравилось&#34;"></button>
        </div>
      </article>
    </li>
  `;
    cardsWrapper.insertAdjacentHTML('afterbegin', cardTemplate);
  }

  findListenerTargets() {
    return {
      card: document.querySelector(`[data-id="${this.id}"]`),
      image: document.querySelector(`[data-id="${this.id}"]`).querySelector('.card__image'),
      title: document.querySelector(`[data-id="${this.id}"]`).querySelector('.card__title'),
      delete: document.querySelector(`[data-id="${this.id}"]`).querySelector('.card__delete'),
      like: document.querySelector(`[data-id="${this.id}"]`).querySelector('.card__like')
    };
  }

  likeCard() {
    const likeButton = this.cardElements.like;
    const likeButtonListener = () => {
      likeButton.classList.toggle('card__like_active');
      if (likeButton.classList.contains('card__like_active')) {
        likeButton.setAttribute('aria-label', 'Убрать отметку \"Понравилось\"');
      } else {
        likeButton.setAttribute('aria-label', 'Добавить отметку \"Понравилось\"');
      }
    }

    likeButton.addEventListener('click', likeButtonListener);
  };

  deleteCard() {
    const deleteButton = this.cardElements.delete;
    const card = this.cardElements.card;
    const deleteButtonListener = () => {
      card.remove();
    }

    deleteButton.addEventListener('click', deleteButtonListener);
  };

  openPhoto() {
    const image = this.cardElements.image;
    const title = this.cardElements.title;

    popupPhoto(image, title)
  }

  addListeners() {
    this.likeCard();
    this.deleteCard();
    this.openPhoto();
  }
}
