import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import IChatCard from './interface.ts';
import Avatar from '../../../components/avatar/index.ts';

export default class ChatCard extends Component {
  constructor(props: IChatCard) {
    super('li', props);

    const { avatar, newMessages } = this.props;

    this.props.isShowMessageCount = newMessages > 0;

    this.props.attr = { class: 'chat-card' };

    this.children.avatar = new Avatar({ url: avatar || '', size: 'medium', isEdit: false });
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.newMessages !== newProps.newMessages) {
      this.setProps({ isShowMessageCount: newProps.newMessages > 0 });
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
