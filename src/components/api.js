const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '0f9e6763-ca59-4d6a-b788-b6c985602524',
    'Content-Type': 'application/json',
  },
};


const getJson = (res) => {
  console.log(res);
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка!${res.statusText} Код ошибки: ${res.status}.`);
};

const getUser = () => fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
  .then((res) => getJson(res))
  .catch((error) => console.error(`Ошибка ${error.status} получения информации о пользователе. ${error.statusText}`));


const getCards = () => fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
})
  .then((res) => getJson(res))
  .catch((error) => console.error(`Ошибка ${error.status} получения информации о карточках. ${error.statusText}`));


const updateUser = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  })
    .then((res) => getJson(res))
    .catch((error) => console.error(`Ошибка ${error.status} обновления информации пользователя. ${error.statusText}`));
};

const updateUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
    .then((res) => getJson(res))
    .catch((error) => console.error(`Ошибка ${error.status} обновления аватара пользователя. ${error.statusText}`));
};

const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then((res) => getJson(res))
    .catch((error) => console.error(`Ошибка ${error.status} добавления карточки. ${error.statusText}`));

};

const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => getJson(res))
    .catch((error) => console.error(`Ошибка ${error.status} удаления карточки. ${error.statusText}`));
};

const deleteCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then((res) => getJson(res))
    .catch((error) => console.error(`Ошибка ${error.status} удаления лайка карточки. ${error.statusText}`));
};

const addCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => getJson(res))
    .catch((error) => console.error(`Ошибка ${error.status} добавления лайка карточки. ${error.statusText}`));
};

export {
  getUser,
  getCards,
  updateUser,
  addCard,
  removeCard,
  deleteCardLike,
  addCardLike,
  updateUserAvatar
};
