export default class Api {
  constructor(config) {
    this.config = config;
  }

  #checkResponse(res) {
    return (res.ok) ? res.json() : Promise.reject(`${res.statusText}${res.status}`);
  };

  #request(url, options = {}) {
    const computedUrl = `${this.config.baseUrl}/${url}`;
    return fetch(computedUrl, { headers: this.config.headers, ...options }).then(res => {
      // return res.json()
      return this.#checkResponse(res);
    });
  }

  getUser() {
    return this.#request(`users/me`);
  }

  getCards() {
    return this.#request(`cards`);
  }

  getData() {
    return Promise.all([this.getUser(), this.getCards()]);
  }

  updateUser({ name, about }) {
    return this.#request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    });
  }

  updateUserAvatar(avatar) {
    return this.#request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    });
  }

  addCard({ name, link }) {
    return this.#request(`cards`, {
      method: 'POST',
      body: JSON.stringify({ name, link })
    });
  }

  removeCard(cardId) {
    return this.#request(`cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  deleteCardLike(cardId) {
    return this.#request(`cards/likes/${cardId}`, {
      method: 'DELETE',
    });
  }

  addCardLike(cardId) {
    return this.#request(`cards/likes/${cardId}`, {
      method: 'PUT',
    });
  }
}
