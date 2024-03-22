import HTTPTransport from '../services/HTTPTransport';
import BaseAPI from '../services/BaseApi';
import BaseUrlApi from '../config/config';
import { IProfileUserData, IProfileUserPassword, IProfileSearchUsers } from '../interfaces/IProfileData';

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

  searchUsers(data: IProfileSearchUsers) {
    return profileAPIInstance.post('/search', { data });
  }
}

export default new ProfileApi();
