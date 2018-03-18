const API_BASE = process.env.REACT_APP_API_URL;

export function post(endpoint, data) {
  console.log('POSTING', data, API_BASE);
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
      console.log('R', r);
      return r.text();
    })
    .catch(err => console.warn(err))
    .then(res => {
      console.log('Success', res);
      return res;
    });
}
