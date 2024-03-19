import HTTPTransport from '../services/HTTPTransport';
import BaseAPI from '../services/BaseApi';
import BaseUrlApi from '../config/config';
import { IChatCreateNew, IChatRemove } from '../interfaces/IChatData';

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

  getChatUsers(id: number) {
    return chatsAPIInstance.get(`/${id}/users`);
  }
}

export default new ChatApi();
