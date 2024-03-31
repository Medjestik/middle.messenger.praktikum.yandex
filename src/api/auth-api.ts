import HTTPTransport from '../services/HTTPTransport.ts';
import BaseAPI from '../services/BaseApi.ts';
import BaseUrlApi from '../config/config.ts';
import { IAuthRegistration, IAuthLogin } from '../interfaces/IAuthData.ts';

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
