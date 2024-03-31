import HTTPTransport from '../services/HTTPTransport.ts';
import BaseAPI from '../services/BaseApi.ts';
import BaseUrlApi from '../config/config.ts';
import {
  IChatCreateNew,
  IChatRemove,
  IChatAddUsers,
  IChatRemoveUsers,
} from '../interfaces/IChatData.ts';

const chatsAPIInstance = new HTTPTransport(`${BaseUrlApi}/chats`);

class ChatApi extends BaseAPI {
  getChats() {
    return chatsAPIInstance.get('/');
  }

  createNewChat(data: IChatCreateNew) {
    return chatsAPIInstance.post('/', { data });
  }

  removeChat(data: IChatRemove) {
    return chatsAPIInstance.delete('/', { data });
  }

  changeChatAvatar(data: FormData) {
    return chatsAPIInstance.put('/avatar', { data });
  }

  getChatUsers(data: number) {
    return chatsAPIInstance.get(`/${data}/users`);
  }

  addUsersToChat(data: IChatAddUsers) {
    return chatsAPIInstance.put('/users', { data });
  }

  removeUsersFromChat(data: IChatRemoveUsers) {
    return chatsAPIInstance.delete('/users', { data });
  }

  getChatToken(data: number) {
    return chatsAPIInstance.post(`/token/${data}`);
  }
}

export default new ChatApi();
