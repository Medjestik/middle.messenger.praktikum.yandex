import EventBus from './EventBus';
import set from '../utils/set';
import { IUser } from '../interfaces/IUser';
import { IChat } from '../interfaces/IChat';

interface IStore {
  user: IUser
  chats: IChat[]
  isLoggedIn: boolean
}

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: IStore = {
    user: {},
    chats: [],
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
