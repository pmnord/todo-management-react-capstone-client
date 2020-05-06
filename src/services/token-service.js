import config from '../config';

const TokenService = {
    setToken(token) {
        return window.localStorage.setItem(`${config.TOKEN_KEY}`, token);
    },
    getToken() {
        return window.localStorage.getItem(config.TOKEN_KEY);
    },
    clearToken() {
        return window.localStorage.removeItem(config.TOKEN_KEY);
    },
    hasToken() {
        return !!TokenService.getToken();
    }
}

export default TokenService;