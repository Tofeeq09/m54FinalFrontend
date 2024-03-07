export const login = async (userData) => {
  const response = await fetch(
    "https://m54finalbackend.onrender.com/api/users/login",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userData.email,
        password: userData.password,
      }),
    }
  );

  const user = await response.json();
  console.log(user);
  return user;
};
