import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import IChatCard from './interface.ts';
import Avatar from '../avatar/index.ts';
import convertDate from '../../utils/convertDate.ts';

export default class ChatCard extends Component {
  constructor(props: IChatCard) {
    super('li', props);

    const { avatar, date } = props;

    if (date !== undefined) {
      this.props.date = convertDate(date);
    }
    this.props.attr = { class: 'chat-card' };

    this.children.avatar = new Avatar({ url: avatar, size: 'medium', isEdit: false });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
