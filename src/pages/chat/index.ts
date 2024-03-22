import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import data from './data';
import Avatar from '../../components/avatar/index';
import IconButton from '../../components/iconButton/index';
import Search from '../../components/search/index';
import ChatCard from '../../components/chatCard/index';
import ChatForm from '../../components/chatForm/index';

export default class Chat extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);
    const { user } = props;
    const currentChat = { name: '', avatar: '' };

    this.props.attr = { class: 'chat' };
    this.props.image = data.image;
    this.props.isShowChat = false;
    this.props.currentChat = currentChat;

    this.children.avatar = new Avatar({ url: user.avatar, size: 'small', isEdit: false });
    this.children.chatAvatar = new Avatar({ url: currentChat.avatar, size: 'small', isEdit: false });
    this.children.profileButton = new IconButton({ icon: 'profile', type: 'button', size: 'medium' });
    this.children.menuButton = new IconButton({ icon: 'menu', type: 'button', size: 'medium' });
    this.children.attachButton = new IconButton({ icon: 'attach', type: 'button', size: 'medium' });
    this.children.search = new Search({ id: 'search-chat' });
    this.children.chatForm = new ChatForm({});

    if (data !== undefined) {
      const chats = data.chats.map((elem) => new ChatCard({
        ...elem,
        events: {
          click: () => {
            this.setProps(this.props.currentChat = { name: elem.name, avatar: elem.avatar });
            this.setProps({ isShowChat: true });
          },
        },
      }));
      this.lists.chats = chats;
    }
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.currentChat !== newProps.currentChat) {
      if (this.children.chatAvatar !== undefined) {
        this.children.chatAvatar.setProps({ url: newProps.currentChat.avatar });
      }
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
