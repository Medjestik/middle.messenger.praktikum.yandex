import EventBus from './EventBus.ts';
import set from '../utils/set.ts';
import { IUser } from '../interfaces/IUser.ts';
import { IChat } from '../interfaces/IChat.ts';
import { IMessage } from '../interfaces/IMessage.ts';

interface IStore {
  user: IUser
  currentChat: IChat
  chats: IChat[]
  currentMessages: IMessage[]
  isLoggedIn: boolean
}

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: IStore = {
    user: {},
    currentChat: { unread_count: 0 },
    chats: [],
    currentMessages: [],
    isLoggedIn: false,
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
