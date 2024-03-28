import { IChat } from '../../../interfaces/IChat';

interface IChatList {
  chats: IChat[]
  onClick: (arg0: IChat) => void
}

export default IChatList;
