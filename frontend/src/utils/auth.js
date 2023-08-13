class Auth {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _gerResponseJson(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  signUp(userEmail, userPassword) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail,
      })
    }).then(this._gerResponseJson);
  }


  signIn(userEmail, userPassword) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail,
      })
    }).then(this._gerResponseJson);
  }

  tokenCheck(token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._gerResponseJson);
  }

}

export const auth = new Auth({
  //baseUrl: 'https://auth.nomoreparties.co',
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
