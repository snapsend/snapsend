// @flow

// switch based on BRANC
const BRANCH = process.env.BRANCH;
console.log('BRANCH: ', BRANCH);
const API_BASE =
  (BRANCH === 'master'
    ? process.env.REACT_APP_MASTER_API_URL
    : process.env.REACT_APP_DEV_API_URL) || '';

export async function post(endpoint: string, data: { token?: ?string }): any {
  if (!data.token) data.token = null;
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

export async function get(endpoint: string, token: ?string): any {
  if (token) endpoint = `${endpoint}/${token}`;
  try {
    const res = await fetch(API_BASE + endpoint, {
      mode: 'cors',
      method: 'GET',
      'Content-Type': 'application/json',
    });
    if (res.status > 299)
      return {
        success: false,
        error: `Error getting endpoing ${endpoint}. Returned ${res.status}`,
      };
    const json = await res.json();
    return json;
  } catch (rejectedValue) {
    console.warn(`GET Error occurred at ${endpoint}`, rejectedValue);
    return { success: false, error: 'An error occurred fetching data' };
  }
}

export async function track(
  action: 'V' | 'D',
  handle: string,
  token: ?string,
  dnum?: ?number
): Promise<void> {
  dnum = typeof dnum === 'number' ? dnum : null;
  token = typeof token === 'string' ? token : null;
  return post('/history', {
    token,
    action,
    handle,
    dnum,
  });
}
