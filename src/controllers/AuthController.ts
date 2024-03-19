import AuthAPI from '../api/auth-api';
import { IAuthRegistration, IAuthLogin } from '../interfaces/IAuthData';
import router from '../router';
import Store from '../services/Store';

class AuthController {
  public registration(data: IAuthRegistration) {
    return AuthAPI.registration(data)
      .then(() => {
        this.getUser();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {

      });
  }

  public login(data: IAuthLogin) {
    return AuthAPI.login(data)
      .then(() => {
        this.getUser();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {

      });
  }

  public getUser(): Promise<void> {
    return AuthAPI.getUser()
      .then((res) => {
        Store.set('user', res);
        Store.set('isLoggedIn', true);
      })
      .catch((err) => {
        Store.set('isLoggedIn', false);
        console.log(err);
      })
      .finally(() => {
        // Логика, выполняемая после завершения обещания
      });
  }

  public logout(): Promise<void> {
    return AuthAPI.logout()
      .then(() => {
        Store.set('isLoggedIn', false);
        router.go('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {

      });
  }
}

export default new AuthController();
