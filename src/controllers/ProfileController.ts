import ProfileApi from '../api/profile-api';
import { IProfileUserData, IProfileUserPassword } from '../interfaces/IProfileData';
import Store from '../services/Store';

class ProfileController {
  public changeUserData(data: IProfileUserData) {
    return ProfileApi.changeUserData(data)
      .then((res) => {
        Store.set('user', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public changeUserPassword(data: IProfileUserPassword) {
    return ProfileApi.changeUserPassword(data)
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public changeUserAvatar(data: FormData) {
    return ProfileApi.changeUserAvatar(data)
      .then((res) => {
        Store.set('user', res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new ProfileController();
