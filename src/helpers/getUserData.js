export const getUserData = () => {
  const ls = localStorage;
  const user = ls.getItem("user");
  return JSON.parse(user);
};

export const getUserName = () => {
  const ls = localStorage;
  const user = ls.getItem("user");
  return JSON.parse(user.name);
};
