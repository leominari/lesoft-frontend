const TOKEN_KEY = 'jwt';

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
   return localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isAuthenticated = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}