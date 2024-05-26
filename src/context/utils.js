// utils.js
export const saveSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};
  
export const getSession = (key) => {
    const session = sessionStorage.getItem(key);
    return session ? JSON.parse(session) : null;
};
  
export const clearSession = (key) => {
    sessionStorage.removeItem(key);
};