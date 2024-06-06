export default class Api {
    constructor({baseUrl}) {
      this._baseUrl=baseUrl;
    //   this._headers=headers;
      this._token="46b2bf9b-75ca-4b5b-87f8-420e1eddb0ec"
    }
    _getResult(res){
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._token,
              },
            // headers: this._headers,
        })
        .then(res => this._getResult(res))
        .then((res)=>{return res;})
    }
    
    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
              },
        // headers: this._headers,
        })
        .then(res => this._getResult(res))
    }
    editProfile(name,about){
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
              },
            // headers: this._headers,
            body: JSON.stringify({
              name,
              about,
            }),
          })
          .then(res => this._getResult(res));
        }
    addNewCard(name,link){
            return fetch(`${this._baseUrl}/cards`, {
                method: "POST",
                headers: {
                    authorization: this._token,
                    "Content-Type": "application/json"
                  },
                // headers: this._headers,
                body: JSON.stringify({
                  name,
                  link,
                }),
              })
              .then(res => this._getResult(res));
        }
    deleteCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: this._token,
            "Content-Type": "application/json"
          },
        // headers: this._headers,
    })
        .then(res => this._getResult(res));
        }
    addLikes(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
            authorization: this._token,
            "Content-Type": "application/json"
          },
        // headers: this._headers,
    })
        .then(res => this._getResult(res));
    }
    removeLikes(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
            authorization: this._token,
            "Content-Type": "application/json"
          },
        // headers: this._headers,
    })
        .then(res => this._getResult(res));
    }
    updateAvatar(link){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
              },
            // headers: this._headers,
            body: JSON.stringify({
                avatar:link,
        }),})
        .then(res => this._getResult(res));
    }
    // getAll(){
    //     return Promise.all([this.getInitialCards(),this.getUserInfo()]);
    // }
}