export const createCard = (card) => {
  const cardsWrapper = document.querySelector('.feed__list');

  cardsWrapper.insertAdjacentHTML('afterbegin',
    `
    <li>
        <article class="card">
          <!-- Как быть с альт текстом для картинок, которые добавляет пользователь? -->
          <img src="${card.image}"
               alt=""
               class="card__image"/>
          <button class="button card__delete" type="button" aria-label="Удалить"></button>
          <div class="card__footer">
            <h2 class="card__title">${card.name}</h2>
            <button class="button card__like" type="button" aria-label="Добавить отметку &#34;Понравилось&#34;"></button>
          </div>
        </article>
      </li>
  `);
};
