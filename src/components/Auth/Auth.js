
import Cookies from 'js-cookie'
const Auth = {
    isAuthenticated: Cookies.get('jwt'),
    authenticate() {
        this.isAuthenticated = true;
    },
    signout() {
        Cookies.remove('jwt')
        this.isAuthenticated = false
        console.log('Signed out')
    },
    getAuth() {
        return this.isAuthenticated;
    }
}
export default Auth;