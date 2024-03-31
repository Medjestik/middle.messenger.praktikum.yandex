import ChatApi from '../api/chat-api.ts';
import Store from '../services/Store.ts';
import { IUser } from '../interfaces/IUser.ts';
import { IChat } from '../interfaces/IChat.ts';
import {
  IChatCreateNew,
  IChatRemove,
  IChatAddUsers,
  IChatRemoveUsers,
} from '../interfaces/IChatData.ts';
import MessageController from './MessageController.ts';

class ChatController {
  public async getChats() {
    try {
      const chats: IChat[] = await ChatApi.getChats() as IChat[];
      await Promise.all(chats.map(async (chat) => {
        if (chat.id) {
          const res = await this.getChatToken(chat.id);
          if (res) {
            await MessageController.connect(chat.id, res.token);
          }
        }
      }));
      Store.set('chats', chats);
    } catch (error) {
      console.error('Ошибка при получении чатов');
    }
  }

  public setCurrentChat(elem: number) {
    MessageController.getOldMessages(elem);
    const { chats } = Store.getState();
    const findChat = chats.find((chat) => chat.id === elem);
    const newChats = chats.map((chat) => {
      if (findChat) {
        if (chat.id === findChat.id) {
          return { ...chat, unread_count: 0 };
        }
      }
      return chat;
    });
    Store.set('currentChat', findChat);
    Store.set('chats', newChats);
  }

  public createNewChat(data: IChatCreateNew): Promise<void> {
    return ChatApi.createNewChat(data)
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        console.error(`Ошибка при создании чата: ${error.message}`);
      });
  }

  public removeChat(data: IChatRemove): Promise<void> {
    return ChatApi.removeChat(data)
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        console.error(`Ошибка при удалении чата: ${error.message}`);
      });
  }

  public changeChatAvatar(data: FormData) {
    return ChatApi.changeChatAvatar(data)
      .then((res) => {
        const chatResult = res as IChat;
        const oldChats = Store.getState().chats;
        const newChats = oldChats.map((chat) => {
          if (chat.id === chatResult.id) {
            return { ...chat, avatar: chatResult.avatar };
          }
          return chat;
        });
        Store.set('currentChat', chatResult);
        Store.set('chats', newChats);
        return chatResult;
      })
      .catch((error) => {
        console.error(`Ошибка при изменении аватара чата: ${error.message}`);
      });
  }

  public getChatUsers(data: number) {
    return ChatApi.getChatUsers(data)
      .then((res) => res as IUser[])
      .catch((error) => {
        console.error(`Ошибка при получении пользователей чата: ${error.message}`);
        return [];
      });
  }

  public addUsersToChat(data: IChatAddUsers): Promise<void> {
    return ChatApi.addUsersToChat(data)
      .then(() => {})
      .catch((error) => {
        console.error(`Ошибка при добавлении пользователей в чат: ${error.message}`);
      });
  }

  public removeUsersFromChat(data: IChatRemoveUsers): Promise<void> {
    return ChatApi.removeUsersFromChat(data)
      .then(() => {})
      .catch((error) => {
        console.error(`Ошибка при удалении пользователей из чата: ${error.message}`);
      });
  }

  public getChatToken(data: number) {
    return ChatApi.getChatToken(data)
      .then((res) => res as { token: string })
      .catch((error) => {
        console.error(`Ошибка при получении токена: ${error.message}`);
      });
  }
}

export default new ChatController();
