import { initialArray } from './initialArray.js';

const addCard = (card) => {
  initialArray.push(card);
}

const closePopup = (target) => {
  target.classList.remove('popup_active');
}

const openPopup = (target) => {
  target.classList.add('popup_active');
}

const popupPhoto = (image, title) => {
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

class Card {
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

const renderCards = () => {
  initialArray.forEach(card => new Card(card))
}

const popupEdit = () => {
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

const popupAdd = () => {
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


renderCards();
popupEdit();
popupAdd();
