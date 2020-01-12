import axios from 'axios'
const API_URL = 'http://localhost:8080'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'


class AuthenticationService {
    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/admin`, {
            username,
            password
        })
    }
    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
     //   localStorage.setItem("token", token);
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }
    createJWTToken(token) {
        return 'Bearer ' + token
    }
    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }
    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }
    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }
    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                console.log("token"+token);
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}
export default new AuthenticationService()
