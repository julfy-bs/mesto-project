import { config } from './enum.js';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка!${res.statusText} Код ошибки: ${res.status}.`);
  }
};

function request(url, options) {
  const computedUrl = `${config.baseUrl}/${url}`;
  return fetch(computedUrl, { headers: config.headers, ...options }).then(checkResponse);
}

const getUser = () => request(`users/me`, {});

const getCards = () => request(`cards`, {});

const updateUser = ({ name, about }) => request(`users/me`, {
  method: 'PATCH',
  body: JSON.stringify({
    name,
    about
  })
});

const updateUserAvatar = (avatar) => request(`users/me/avatar`, {
  method: 'PATCH',
  body: JSON.stringify({ avatar })
});

const addCard = ({ name, link }) => request(`cards`, {
  method: 'POST',
  body: JSON.stringify({ name, link })
});

const removeCard = (cardId) => request(`cards/${cardId}`, {
  method: 'DELETE',
});

const deleteCardLike = (cardId) => request(`cards/likes/${cardId}`, {
  method: 'DELETE',
});

const addCardLike = (cardId) => request(`cards/likes/${cardId}`, {
  method: 'PUT',
});

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
