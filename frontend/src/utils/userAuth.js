export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    // console.log(res)
};

export const getContent = (JWT) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JWT}`
        },
    })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}
