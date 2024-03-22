import ProfileApi from '../api/profile-api';
import { IProfileUserData, IProfileUserPassword, IProfileSearchUsers } from '../interfaces/IProfileData';
import Store from '../services/Store';

class ProfileController {
  public changeUserData(data: IProfileUserData) {
    return ProfileApi.changeUserData(data)
      .then((res) => {
        Store.set('user', res);
      })
      .catch((error) => {
        throw new Error(`Ошибка при изменении информации: ${error.message}`);
      });
  }

  public changeUserPassword(data: IProfileUserPassword) {
    return ProfileApi.changeUserPassword(data)
      .then(() => {
      })
      .catch((error) => {
        throw new Error(`Ошибка при изменении пароля: ${error.message}`);
      });
  }

  public changeUserAvatar(data: FormData) {
    return ProfileApi.changeUserAvatar(data)
      .then((res) => {
        Store.set('user', res);
      })
      .catch((error) => {
        throw new Error(`Ошибка при изменении аватара: ${error.message}`);
      });
  }

  public searchUsers(data: IProfileSearchUsers) {
    return ProfileApi.searchUsers(data)
      .then((res) => res)
      .catch((error) => {
        throw new Error(`Ошибка при поиске пользователей: ${error.message}`);
      });
  }
}

export default new ProfileController();
