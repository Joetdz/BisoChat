const saveToken = (token, userId) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
};

const logout = () => {
  return localStorage.removeItem("token");
};

export const accountService = {
  saveToken,
  logout,
};
