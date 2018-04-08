// @flow

export const setToken = (t: string, cookie: any) => {
  // set the cookie with the auth token
  const oneyear = new Date();
  const year = oneyear.getFullYear();
  oneyear.setFullYear(year + 1);
  console.log('SETTING', t);
  cookie.set('token', t, { path: '/', expires: oneyear });
};

export const getToken = (cookie: any) => cookie.get('token');
