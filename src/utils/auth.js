const BASE_URL = 'https://auth.nomoreparties.co';

const getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (username, password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
    })
        .then(getResponse);
};

export const authorization = (identifier, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ identifier, password })
    })
        .then(getResponse);
        // .then((data) => {
        //     if (data.user) {
        //         localStorage.setItem('jwt', data.jwt);
        //         return data;
        //     } else {
        //         return;
        //     }
        // });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(getResponse);
};