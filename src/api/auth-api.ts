import HTTPTransport from '../services/HTTPTransport';
import BaseAPI from '../services/BaseApi';
import BaseUrlApi from '../config/config';
import { IAuthRegistration, IAuthLogin } from '../interfaces/IAuthData';

const authAPIInstance = new HTTPTransport(`${BaseUrlApi}/auth`);

class AuthAPI extends BaseAPI {
  registration(data: IAuthRegistration) {
    return authAPIInstance.post('/signup', { data });
  }

  login(data: IAuthLogin) {
    return authAPIInstance.post('/signin', { data });
  }

  getUser() {
    return authAPIInstance.get('/user');
  }

  logout() {
    return authAPIInstance.post('/logout');
  }
}

export default new AuthAPI();
