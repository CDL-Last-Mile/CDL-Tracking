import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
  deleteBody: _deleteBody,
  patch,
  postForm,
  patchForm,
  putForm,
}

function get(url) {
  const requestOptions = {
    method: "GET",
  }
  return fetch(url, requestOptions)
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function postForm(url, body) {
  const requestOptions = {
    method: "POST",
    body: body,
  }
  return fetch(url, requestOptions)
}
function patchForm(url, body) {
  const requestOptions = {
    method: "PATCH",
    body: body,
  }
  return fetch(url, requestOptions)
}

function putForm(url, body) {
  const requestOptions = {
    method: "PUT",
    body: body,
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function put(url, body) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function patch(url, body) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url),
  }
  return fetch(url, requestOptions).then(handleResponse)
}
function _deleteBody(url, body) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

// helper functions

// function authHeader(url) {
//   // return auth header with jwt if user is logged in and request is to the api url
//   const user = userService.userValue
//   const isLoggedIn = user && user.token.access_token
//   const isApiUrl = url.startsWith(URL)
//   if (isLoggedIn && isApiUrl) {
//     return { Authorization: `Bearer ${user.token.access_token}` }
//   } else {
//     return {}
//   }
// }

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)

    if (!response.ok) {
      //   if ([401, 403].includes(response.status) && userService.userValue) {
      //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //     userService.logout()
      //   }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

function handleResponseForm(response) {
  return response.text().then((text) => {
    const data = text

    if (!response.ok) {
      // if ([401, 403].includes(response.status) && userService.userValue) {
      //   // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      //   userService.logout()
      // }

      const error = (data && data.message) || response.statusText
      console.log(error)
      return Promise.reject(error)
    }

    return data
  })
}
