export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      return Promise.reject(`Error: ${res.status}, ${err.message}`);
    });
  }
  _request(baseUrl, headers) {
    return fetch(baseUrl, headers).then(this._getResult);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this.headers });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this.headers,
    });
  }

  updateProfile({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  updateAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    });
  }

  addNewCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  addLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    });
  }

  removeLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}
