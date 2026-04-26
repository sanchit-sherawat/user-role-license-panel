export const getToken = () => localStorage.getItem('token');

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1]));
};
