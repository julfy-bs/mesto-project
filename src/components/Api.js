export default class Api {
  constructor({ headers, baseUrl }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return (res.ok) ? res.json() : Promise.reject(`${res.statusText}${res.status}`);
  };

  _request(url, options = {}) {
    const computedUrl = `${this._baseUrl}/${url}`;
    return fetch(computedUrl, { headers: this._headers, ...options }).then(res => this._checkResponse(res));
  }

  getUser() {
    return this._request(`useras/me`);
  }

  getCards() {
    return this._request(`cards`);
  }

  getAppData() {
    return Promise.all([this.getUser(), this.getCards()]);
  }

  updateUser({ name, about }) {
    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    });
  }

  updateUserAvatar(avatar) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    });
  }

  addCard({ name, link }) {
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify({ name, link })
    });
  }

  removeCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  toggleLike(cardId, hasOwnerLike) {
    return this._request(`cards/likes/${cardId}`, {
      method: hasOwnerLike ? 'DELETE' : 'PUT',
    });
  }
}
