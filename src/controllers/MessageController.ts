import WSTransport, { WSTransportEvents } from '../services/WSTransport.ts';
import Store from '../services/Store.ts';
import { IMessage } from '../interfaces/IMessage.ts';

class MessagesController {
  private sockets: Map<number, WSTransport> = new Map();

  async connect(id: number, token: string) {
    try {
      if (this.sockets.has(id)) {
        return;
      }
      const userId = Store.getState().user.id;
      const transport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
      this.sockets.set(id, transport);

      await transport.connect();

      this.subscribe(transport, id);
    } catch (error) {
      console.error(error);
    }
  }

  getOldMessages(id: number) {
    const socket = this.sockets.get(id);
    if (!socket) {
      console.error('Чат не подключен');
    } else {
      socket.send({ type: 'get old', content: '0' });
    }
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      console.error('Чат не подключен');
    } else {
      socket.send({
        type: 'message',
        content: message,
      });
    }
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  private onMessage(id: number, messages: IMessage | IMessage[]) {
    const currentChatId = Store.getState().currentChat.id;
    const currentUsersId = Store.getState().user.id;
    const isArray = Array.isArray(messages);
    const isCurrentChat = id === currentChatId;

    if (isArray) {
      const newMessages = messages.map((elem) => {
        const uniqId = parseInt(String(id) + String(elem.id), 10);
        const isMyMessage = currentUsersId === elem.user_id;
        return { ...elem, uniqId, isMyMessage };
      }).reverse();
      Store.set('currentMessages', newMessages);
    } else if (isCurrentChat) {
      const uniqId = parseInt(String(id) + String(messages.id), 10);
      const isMyMessage = currentUsersId === messages.user_id;
      const newMessages = { ...messages, uniqId, isMyMessage };
      const oldMessages = Store.getState().currentMessages;
      const oldChats = Store.getState().chats;
      const updatedChats = oldChats.map((chat) => {
        if (chat.id === id) {
          return { ...chat, last_message: messages };
        }
        return chat;
      });
      Store.set('chats', updatedChats);
      Store.set('currentMessages', [...oldMessages, newMessages]);
    } else {
      const oldChats = Store.getState().chats;
      const updatedChats = oldChats.map((chat) => {
        if (chat.id === id) {
          return { ...chat, last_message: messages, unread_count: chat.unread_count + 1 };
        }
        return chat;
      });
      Store.set('chats', updatedChats);
    }
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WSTransport, id: number) {
    transport.on(WSTransportEvents.message, (message) => this.onMessage(id, message as IMessage | IMessage[]));
    transport.on(WSTransportEvents.close, () => this.onClose(id));
  }
}

export default new MessagesController();
