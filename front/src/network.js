// @flow

const API_BASE = process.env.REACT_APP_API_URL || '';

export async function post(endpoint: string, data: {}): any {
  try {
    const res = await fetch(API_BASE + endpoint, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
    });

    const json = await res.json();
    return json;
  } catch (rejectedValue) {
    console.warn(`POST Error occurred at ${endpoint}`, data, rejectedValue);
    return 'An error occurred posting data';
  }
}

export async function get(endpoint: string): any {
  try {
    const res = await fetch(API_BASE + endpoint, {
      mode: 'cors',
      method: 'GET',
    });
    const json = await res.json();
    return json;
  } catch (rejectedValue) {
    console.warn(`GET Error occurred at ${endpoint}`, rejectedValue);
    return { error: 'An error occurred fetching data' };
  }
}
