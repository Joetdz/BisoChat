const saveToken = (token, isLoggedIn) => {
  return localStorage.setItem("token", token);
};

const logout = () => {
  return localStorage.removeItem("token");
};

export const accountService = {
  saveToken,
  logout,
};
