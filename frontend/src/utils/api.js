class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(Url, options) {
        return fetch(Url, options)
            .then(this._checkRes)
    }

    getUserInfo() {
        const Url = `${this._baseUrl}/users/me`;
        return this._request(Url, {
            headers: this._headers
        })
    }

    getInitialCards() {
        const Url = `${this._baseUrl}/cards`
        return this._request(Url, {
            headers: this._headers
        })
    }

    addNewCard(cardData) {
        const Url = `${this._baseUrl}/cards`;
        return this._request(Url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardData)
        })
    }

    setUserInfo(infoData) {
        const Url = `${this._baseUrl}/users/me`;
        return this._request(Url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(infoData)
        })
    }

    deleteCard(cardId) {
        const Url = `${this._baseUrl}/cards/${cardId}`;
        return this._request(Url, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    addLikeCard(cardId) {
        const Url = `${this._baseUrl}/cards/${cardId}/likes`;
        return this._request(Url, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    deleteLikeCard(cardId) {
        const Url = `${this._baseUrl}/cards/${cardId}/likes`;
        return this._request(Url, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    editUserAvatar(avatar) {
        const Url = `${this._baseUrl}/users/me/avatar`;
        return this._request(Url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        })
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: '7ff098a0-f867-4f2f-af72-c15adfdb3347',
        'Content-Type': 'application/json'
    }
});