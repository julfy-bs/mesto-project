const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '0f9e6763-ca59-4d6a-b788-b6c985602524',
    'Content-Type': 'application/json',
  },
};


const getJson = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject({ status: res.status, statusText: res.statusText });
};

const logJson = (res) => {
  console.log(res);
  return res;
};


const getUser = () => fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then((res) => getJson(res));

const getCards = () => fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then((res) => getJson(res)).then(logJson);

const updateUser = ({ name, about }) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about
    })
  }).then((res) => getJson(res)).then(logJson);
};

const addCard = ({ name, link }) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  }).then((res) => getJson(res)).then(logJson);
};

const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then((res) => getJson(res)).then(logJson);
};

const toggleCardLike = (cardId, hasOwnerLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: hasOwnerLike ? 'DELETE' : 'PUT',
    headers: config.headers
  }).then((res) => getJson(res)).then(logJson);
};

export {
  getUser,
  getCards,
  updateUser,
  addCard,
  removeCard,
  toggleCardLike
};
