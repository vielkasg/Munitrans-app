export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("auth_token");
  return !!token;
};

export const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token);
};

export const removeToken = (): void => {
  localStorage.removeItem("auth_token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("auth_token");
};
