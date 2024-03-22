import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import IChatCard from './interface';
import Avatar from '../avatar/index';
import convertDate from '../../utils/convertDate';

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
