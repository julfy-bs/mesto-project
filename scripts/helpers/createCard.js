export const createCard = (card) => {
  const cardsWrapper = document.querySelector('.feed__list');

  cardsWrapper.insertAdjacentHTML('beforeend',
`
    <li>
        <article class="card">
          <img src="${ card.image }"
               alt="Сентинский храм в окрестностях города Карачаевск. На фоне виднеются зеленые горные леса на склонах Кавказа."
               class="card__image"/>
          <div class="card__footer">
            <h2 class="card__title">${card.name}</h2>
            <button class="button card__like" type="button" aria-label="Понравилось"></button>
          </div>
        </article>
      </li>
  `)

}
