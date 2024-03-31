import { IChat } from '../../../interfaces/IChat.ts';

interface IChatList {
  chats: IChat[]
  onClick: (arg0: IChat) => void
}

export default IChatList;
