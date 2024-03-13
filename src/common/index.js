// src/common/index.js

export const writeCookie = (key, value, days) => {
  // keys = name of cookie
  // value = jwt || set value you want to store in cookie
  // days = expiry date of cookie

  let date = new Date();
  days = days || 365;

  date.setDate(date.getDate() + days);

  document.cookie =
    key + "=" + value + "; expires=" + date.toGMTString() + "; path=/";
  console.log("JWT token written to cookie:", value); // JWT token written to cookie: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEwMzM0ODA5LCJleHAiOjE3MTAzNjM2MDl9.47SeqxsjCNhccnuARcSzXkqJjUWBCTqFWKNtZoNNWrE
};

export const getCookie = (cookieName) => {
  const re = new RegExp(`(?<=${cookieName}=)[^;]*`);
  let cookie;

  try {
    cookie = document.cookie.match(re)[0];
  } catch (error) {
    cookie = false;
  }

  console.log("JWT token read from cookie:", cookie);
  return cookie;
};
