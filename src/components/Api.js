// export default class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this.headers = headers;
//   }
//   _getResult(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return res.json().then((err) => {
//       return Promise.reject(`Error: ${res.status}, ${err.message}`);
//     });
//   }
//   getInitialCards() {
//     return fetch(`${this._baseUrl}/cards`, {
//       headers: this.headers,
//     }).then(this._getResult);
//   }
//   getUserInfo() {
//     return fetch(`${this._baseUrl}/users/me`, {
//       headers: this.headers,
//     }).then(this._getResult);
//   }
//   getAll() {
//     return Promise.all([this.getInitialCards(), this.getUserInfo()]);
//   }
//   updateProfile({ name, about }) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: this.headers,
//       body: JSON.stringify({
//         name,
//         about,
//       }),
//     }).then(this._getResult);
//   }
//   updateAvatar(avatar) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this.headers,
//       body: JSON.stringify(avatar),
//     }).then(this._getResult);
//   }
//   addNewCard(data) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: "POST",
//       headers: this.headers,
//       body: JSON.stringify({
//         name: data.name,
//         link: data.link,
//       }),
//     }).then(this._getResult);
//   }
//   deleteCard(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}`, {
//       method: "DELETE",
//       headers: this.headers,
//     }).then(this._getResult);
//   }
//   addLike(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "PUT",
//       headers: this.headers,
//     }).then(this._getResult);
//   }
//   removeLike(cardId) {
//     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
//       method: "DELETE",
//       headers: this.headers,
//     }).then(this._getResult);
//   }
// }
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResult(res) {
    console.log("Response:", res); // Log response
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      console.error("Error response:", err); // Log error
      return Promise.reject(`Error: ${res.status}, ${err.message}`);
    });
  }

  getInitialCards() {
    console.log("Fetching initial cards..."); // Log fetch action
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._getResult);
  }

  getUserInfo() {
    console.log("Fetching user info..."); // Log fetch action
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._getResult);
  }

  getAll() {
    console.log("Fetching all data..."); // Log fetch action
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  updateProfile({ name, about }) {
    console.log("Updating profile..."); // Log fetch action
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResult);
  }

  updateAvatar(avatar) {
    console.log("Updating avatar..."); // Log fetch action
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    }).then(this._getResult);
  }

  addNewCard(data) {
    console.log("Adding new card..."); // Log fetch action
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResult);
  }

  deleteCard(cardId) {
    console.log("Deleting card...", cardId); // Log fetch action
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResult);
  }

  addLike(cardId) {
    console.log("Adding like...", cardId); // Log fetch action
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._getResult);
  }

  removeLike(cardId) {
    console.log("Removing like...", cardId); // Log fetch action
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._getResult);
  }
}
