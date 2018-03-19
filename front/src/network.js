const API_BASE = process.env.REACT_APP_API_URL;

export function post(endpoint, data) {
  console.log('DATA', data);
  return fetch(API_BASE + endpoint, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
    method: 'POST',
  })
    .catch(err => console.warn(err))
    .then(r => {
      return r.json();
    })
    .catch(err => console.warn(err))
    .then(res => {
      return res;
    });
}

export function get(endpoint) {
  return fetch(API_BASE + endpoint, {
    mode: 'cors',
    method: 'GET',
  })
    .catch(err => console.warn(err))
    .then(r => {
      return r.json();
    })
    .catch(err => console.warn(err))
    .then(res => {
      return res;
    });
}
