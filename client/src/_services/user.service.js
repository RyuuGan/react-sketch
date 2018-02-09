export const userService = {
  login,
  logout,
  register
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch('/auth/login', requestOptions)
    .then(handleResponse)
    .then(data => {
      // login successful if there's a jwt token in the response
      if (data.user && data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', JSON.stringify(data.token));
      }

      return data.user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch('/auth/signup', requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}
