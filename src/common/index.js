// src/common/index.js

export const writeCookie = (key, value, days) => {
  // keys = name of cookie
  // value = jwt || set value you want to store in cookie
  // days = expiry date of cookie

  let date = new Date();
  days = days || 365;

  date.setDate(date.getDate() + days);

  let cookie = (document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; path=/");
  console.log(cookie);
};

export const getCookie = (cookieName) => {
  const re = new RegExp(`(?<=${cookieName}=)[^;]*`);
  try {
    let cookie = document.cookie.match(re)[0];
    return cookie;
  } catch (error) {
    return false;
  }
};
