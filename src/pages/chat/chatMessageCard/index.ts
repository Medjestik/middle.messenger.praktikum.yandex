import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import { IMessageCard } from './interface.ts';

export default class ChatMessageCard extends Component {
  constructor(props: IMessageCard) {
    super('li', props);

    this.props.attr = { class: `chat-message ${props.isMyMessage ? 'chat-message_status_owner' : ''}` };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
