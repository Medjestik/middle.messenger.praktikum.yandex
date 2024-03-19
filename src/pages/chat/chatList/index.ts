import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IChatList from './interface';
import ChatCard from '../chatCard';
import { IChat } from '../../../interfaces/IChat';
import diffArrays from '../../../utils/diffArrays';
import convertDate from '../../../utils/convertDate';

export default class ChatList extends Component {
  constructor(props: IChatList) {
    super('ul', props);
    const { chats } = props;
    this.props.attr = { class: 'chat__list' };
    this.props.chats = props.chats;
    this.lists.cards = this.renderCards(chats);
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.chats && newProps.chats) {
      console.log(oldProps);
      console.log(newProps);
      const addedChats = diffArrays<IChat>(oldProps.chats, newProps.chats, 'id').added;
      const removedChats = diffArrays<IChat>(oldProps.chats, newProps.chats, 'id').removed;

      addedChats.forEach((elem: IChat) => {
        this.lists.cards.unshift(this.createChatCard(elem));
      });

      removedChats.forEach((elem: IChat) => {
        const index = this.lists.cards.findIndex((chat: ChatCard) => chat.props.id === elem.id);
        if (index !== -1) {
          this.lists.cards.splice(index, 1);
        }
      });
    }
    return true;
  }

  createChatCard(chat: IChat) {
    const { onClick } = this.props;
    const lastMessage = chat.last_message
      ? {
        isEmpty: false, owner: false, time: convertDate(chat.last_message.time), content: chat.last_message.content,
      }
      : {
        isEmpty: true, owner: false, time: '', content: '',
      };
    return new ChatCard({
      id: chat.id,
      avatar: chat.avatar,
      title: chat.title,
      ownerId: chat.created_by,
      lastMessage: {
        isEmpty: lastMessage.isEmpty,
        owner: false,
        time: lastMessage.time,
        content: lastMessage.content,
      },
      newMessages: chat.unread_count,
      events: {
        click: () => {
          onClick(chat);
        },
      },
    });
  }

  renderCards(chats: IChat[]) {
    return chats.map((chat: IChat) => this.createChatCard(chat));
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
