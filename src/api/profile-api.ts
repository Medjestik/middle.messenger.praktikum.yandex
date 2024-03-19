import HTTPTransport from '../services/HTTPTransport';
import BaseAPI from '../services/BaseApi';
import BaseUrlApi from '../config/config';
import { IProfileUserData, IProfileUserPassword } from '../interfaces/IProfileData';

const profileAPIInstance = new HTTPTransport(`${BaseUrlApi}/user`);

class ProfileApi extends BaseAPI {
  changeUserData(data: IProfileUserData) {
    return profileAPIInstance.put('/profile', { data });
  }

  changeUserPassword(data: IProfileUserPassword) {
    return profileAPIInstance.put('/password', { data });
  }

  changeUserAvatar(data: FormData) {
    return profileAPIInstance.put('/profile/avatar', { data });
  }
}

export default new ProfileApi();
