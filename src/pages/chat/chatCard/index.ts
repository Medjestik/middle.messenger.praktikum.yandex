import Component from '../../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import IChatCard from './interface';
import Avatar from '../../../components/avatar';

export default class ChatCard extends Component {
  constructor(props: IChatCard) {
    super('li', props);

    const { avatar } = props;
    this.props.attr = { class: 'chat-card' };

    this.children.avatar = new Avatar({ url: avatar || '', size: 'medium', isEdit: false });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
