
import Cookies from 'js-cookie'
const Auth = {
    isAuthenticated: Cookies.get('jwt'),
    authenticate() {
        this.isAuthenticated = true;
        localStorage.setItem('isLogged', true);
    },
    signout() {
        Cookies.remove('jwt')
        Cookies.remove('userId')

        this.isAuthenticated = false
        localStorage.setItem('isLogged', false);

        console.log('Signed out')
    },
    getAuth() {
        return this.isAuthenticated;
    }
}
export default Auth;