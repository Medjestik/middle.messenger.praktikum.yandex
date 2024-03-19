import ChatApi from '../api/chat-api';
import Store from '../services/Store';
import { IChatCreateNew, IChatRemove } from '../interfaces/IChatData';

class ChatController {
  public getChats(): Promise<void> {
    return ChatApi.getChats()
      .then((res) => {
        Store.set('chats', res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  }

  public createNewChat(data: IChatCreateNew): Promise<void> {
    return ChatApi.createNewChat(data)
      .then(() => {
        this.getChats();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public removeChat(data: IChatRemove): Promise<void> {
    return ChatApi.removeChat(data)
      .then(() => {
        this.getChats();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public getChatUsers(id: number): Promise<void> {
    return ChatApi.getChatUsers(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  }
}

export default new ChatController();
