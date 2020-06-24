const TOKEN_KEY = 'jwt';

// export const setToken = (token) => {
//     Cookie.set(TOKEN_KEY, token)
// }

// export const getToken = () => {
//     Cookie.get(TOKEN_KEY)
// }

// export const removeToken = () => {
//     Cookie.remove(TOKEN_KEY)
// }

// export const isAuthenticated = () => {
//     if (Cookie.get(TOKEN_KEY)) {
//         return true;
//     }
//     console.log('ei')
//     return false;
// }



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