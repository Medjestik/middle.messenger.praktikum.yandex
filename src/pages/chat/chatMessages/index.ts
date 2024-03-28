import Component from '../../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import { IMessage } from '../../../interfaces/IMessage';
import ChatMessageCard from '../chatMessageCard';
import diffArrays from '../../../utils/diffArrays';
import convertDate from '../../../utils/convertDate';
import Indexed from '../../../types/indexed';
import connect from '../../../utils/connect';

export class ChatMessages extends Component {
  constructor(tagName: string = 'div', props: Record<string, any>) {
    super(tagName, props);

    this.props.isShowMessages = props.currentMessages.length > 0;
    this.props.currentMessages = props.currentMessages;
    this.props.attr = { class: 'chat-messages' };
    const { currentMessages } = this.props;
    this.lists.cards = this.renderCards(currentMessages);
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.currentMessages && newProps.currentMessages) {
      const addedMessages = diffArrays<IMessage>(oldProps.currentMessages, newProps.currentMessages, 'uniqId').added;
      const removedMessages = diffArrays<IMessage>(oldProps.currentMessages, newProps.currentMessages, 'uniqId').removed;

      addedMessages.forEach((elem: IMessage) => {
        this.lists.cards.unshift(this.createMessageCard(elem));
      });

      removedMessages.forEach((elem: IMessage) => {
        const index = this.lists.cards.findIndex((message: ChatMessageCard) => message.props.uniqId === elem.uniqId);
        if (index !== -1) {
          this.lists.cards.splice(index, 1);
        }
      });
      this.setProps({ isShowMessages: newProps.currentMessages.length > 0 });
    }
    return true;
  }

  createMessageCard(message: IMessage) {
    return new ChatMessageCard({
      content: message.content,
      id: message.id,
      uniqId: message.uniqId,
      isMyMessage: message.isMyMessage,
      time: convertDate(message.time),
      type: message.type,
    });
  }

  renderCards(messages: IMessage[]) {
    return messages.map((message: IMessage) => this.createMessageCard(message));
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

function mapUserToProps(state: Indexed) {
  return {
    user: state.user,
    currentMessages: state.currentMessages,
  };
}

export const ChatMessagesConnect = connect(mapUserToProps)(ChatMessages);
