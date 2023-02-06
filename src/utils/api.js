class Api {
    constructor(options) {
        this._options = options;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getProfile() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers
        })
            .then(this._getResponseData)
    }
    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers
        })
            .then(this._getResponseData)
    }
    addProfile(data) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.job
            })
        })
            .then(this._getResponseData)
    }
    addCard(data) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData)
    }
    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
            .then(this._getResponseData)
    }
    toggleLike(id, isDisliked) {
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: isDisliked ? 'PUT' : 'DELETE',
            headers: this._options.headers
        })
            .then(this._getResponseData)
    }
    addAvatar({ avatar }) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(this._getResponseData)
    }
    getUserAndCard() {
        const promises = [this.getProfile(), this.getInitialCards()];
        return Promise.all(promises);
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '1eff360a-a05c-459a-b944-dc645f17e291',
        'Content-Type': 'application/json'
    }
});
export default api