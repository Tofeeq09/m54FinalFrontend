const url = import.meta.env.VITE_APP_BASE_URL;

export const login = async (userData) => {
  const response = await fetch(`${url}/api/users/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }),
  });

  const user = await response.json();
  console.log(user);
  return user;
};
