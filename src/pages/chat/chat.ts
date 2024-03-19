import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import stubImage from '../../images/chat.svg';
import Avatar from '../../components/avatar/index';
import IconButton from '../../components/iconButton/index';
import DropdownMenu from '../../components/dropdownMenu';
import Search from '../../components/search/index';
import ChatList from './chatList';
import ChatForm from '../../components/chatForm/index';
import CreateNewChatPopup from '../../components/popup/createNewChatPopup';
import ConfirmRemovePopup from '../../components/popup/removeChatPopup';
import router from '../../router';
import isEqual from '../../utils/isEqual';

export default class Chat extends Component {
  constructor(propsAndChildren: Record<string, any>) {
    super('main', propsAndChildren);
    this.props.attr = { class: 'chat' };
    this.props.chats = propsAndChildren.chats;
    this.props.user = propsAndChildren.user;
    this.props.currentChat = {};
    this.props.isShowChat = false;
    this.props.isShowCreateChatPopup = false;
    this.props.isShowRemoveChatPopup = false;
    this.props.stubImage = stubImage;

    const {
      chats,
      isShowCreateChatPopup,
      currentChat,
    } = this.props;

    this.children.chatAvatar = new Avatar({ url: currentChat.avatar || '', size: 'small', isEdit: false });
    this.children.search = new Search({ id: 'search-chat' });

    this.children.chatMenu = new DropdownMenu({
      options: this.getDropdownMenuOptions(),
      position: 'bottom-right',
      isShow: false,
      onClose: this.closeDropdownMenu.bind(this),
    });
    this.children.attachMenu = new DropdownMenu({
      options: [
        {
          icon: 'location',
          text: 'Локация',
          onClick: () => {},
        },
        {
          icon: 'file',
          text: 'Файл',
          onClick: () => {},
        },
        {
          icon: 'media',
          text: 'Фото или видео',
          onClick: () => {},
        },
      ],
      position: 'top-left',
      isShow: false,
      onClose: this.closeDropdownMenu.bind(this),
    });
    this.children.profileButton = new IconButton({
      icon: 'profile',
      type: 'button',
      size: 'medium',
      events: {
        click: () => {
          router.go('/settings');
        },
      },
    });
    this.children.menuButton = new IconButton({
      icon: 'menu',
      type: 'button',
      size: 'medium',
      events: {
        click: () => {
          this.setProps({ isShowChatMenu: true });
          this.children.chatMenu.setProps({ isShow: true });
        },
      },
    });
    this.children.attachButton = new IconButton({
      icon: 'attach',
      type: 'button',
      size: 'medium',
      events: {
        click: () => {
          this.children.attachMenu.setProps({ isShow: true });
        },
      },
    });

    this.children.createChatPopup = new CreateNewChatPopup({ isOpen: isShowCreateChatPopup, onClose: this.closePopup.bind(this) });
    this.children.removeChatPopup = new ConfirmRemovePopup({
      elemId: currentChat.id,
      isOpen: isShowCreateChatPopup,
      onClose: this.closePopup.bind(this),

    });
    this.children.chatForm = new ChatForm({});

    this.children.chatList = new ChatList({
      chats,
      onClick: (elem) => {
        this.setProps({ currentChat: elem });
        this.setProps({ isShowChat: true });
      },
    });
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.displayName = user.display_name || user.first_name;
    this.children.avatar = new Avatar({ url: user.avatar, size: 'small', isEdit: false });
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.currentChat !== newProps.currentChat) {
      this.setProps({ currentChat: newProps.currentChat });
      if (this.children.removeChatPopup) {
        this.children.removeChatPopup.setProps({ elemId: newProps.currentChat.id });
      }
      if (this.children.chatAvatar) {
        this.children.chatAvatar.setProps({ url: newProps.currentChat.avatar });
      }
    }
    if (this.children.chatMenu) {
      if (oldProps.isShowChat !== newProps.isShowChat) {
        this.children.chatMenu.setProps({ options: this.getDropdownMenuOptionsWithChat() });
      }
    }
    if (oldProps.chats && newProps.chats !== undefined && this.children.chatList) {
      if (!isEqual(oldProps.chats, newProps.chats)) {
        this.children.chatList.setProps({ chats: newProps.chats });
      }
    }
    return true;
  }

  getDropdownMenuOptions() {
    return [
      {
        icon: 'add',
        text: 'Добавить чат',
        onClick: () => {
          this.setProps({ isShowCreateChatPopup: true });
          this.children.createChatPopup.setProps({ isOpen: true });
          this.children.chatMenu.setProps({ isShow: false });
        },
      },
    ];
  }

  getDropdownMenuOptionsWithChat() {
    return [
      ...this.getDropdownMenuOptions(),
      {
        icon: 'remove',
        text: 'Удалить чат',
        onClick: () => {
          this.setProps({ isShowRemoveChatPopup: true });
          this.children.removeChatPopup.setProps({ isOpen: true });
          this.children.chatMenu.setProps({ isShow: false });
        },
      },
      {
        icon: 'add',
        text: 'Получить пользователей',
        onClick: () => {},
      },
      {
        icon: 'add',
        text: 'Добавить пользователя',
        onClick: () => {},
      },
    ];
  }

  closeDropdownMenu() {
    this.children.chatMenu.setProps({ isShow: false });
    this.children.attachMenu.setProps({ isShow: false });
  }

  closePopup() {
    this.setProps({ isShowCreateChatPopup: false, isShowRemoveChatPopup: false });
    this.children.createChatPopup.setProps({ isOpen: false });
    this.children.removeChatPopup.setProps({ isOpen: false });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
