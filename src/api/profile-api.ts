import HTTPTransport from '../services/HTTPTransport.ts';
import BaseAPI from '../services/BaseApi.ts';
import BaseUrlApi from '../config/config.ts';
import { IProfileUserData, IProfileUserPassword, IProfileSearchUsers } from '../interfaces/IProfileData.ts';

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
