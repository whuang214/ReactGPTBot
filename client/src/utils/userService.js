import tokenService from "./tokenService";

const { VITE_API_URL } = import.meta.env;
const API_URL = VITE_API_URL + "/users/";

// user should be form data for signup
function signup(user) {
  return (
    fetch(API_URL + "signup", {
      method: "POST",
      body: user,
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Something went wrong in signup!");
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  //   The above could have been written as
  //   .then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(API_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error("Bad Credentials!");
    })
    .then(({ token }) => tokenService.setToken(token));
}

export default {
  signup,
  getUser,
  logout,
  login,
};
