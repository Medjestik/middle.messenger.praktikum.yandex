import AuthAPI from '../api/auth-api';
import { IAuthRegistration, IAuthLogin } from '../interfaces/IAuthData';
import router from '../router';
import Store from '../services/Store';
import ChatController from './ChatController';

class AuthController {
  public registration(data: IAuthRegistration) {
    return AuthAPI.registration(data)
      .then(() => {
        this.getUser();
      })
      .then(() => {
        ChatController.getChats();
      })
      .then(() => {
        router.go('/messenger');
      })
      .catch((error) => {
        console.error(`Ошибка при регистрации: ${error.message}`);
      });
  }

  public login(data: IAuthLogin) {
    return AuthAPI.login(data)
      .then(() => {
        this.getUser();
      })
      .then(() => {
        ChatController.getChats();
      })
      .then(() => {
        router.go('/messenger');
      })
      .catch((error) => {
        console.error(`Ошибка при авторизации: ${error.message}`);
      });
  }

  public getUser(): Promise<void> {
    return AuthAPI.getUser()
      .then((res) => {
        Store.set('user', res);
        Store.set('isLoggedIn', true);
      })
      .catch(() => {
        Store.set('isLoggedIn', false);
      });
  }

  public logout(): Promise<void> {
    return AuthAPI.logout()
      .then(() => {
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        Store.set('isLoggedIn', false);
        router.go('/');
      })
      .catch((error) => {
        console.error(`Ошибка при выходе из приложения: ${error.message}`);
      });
  }
}

export default new AuthController();
