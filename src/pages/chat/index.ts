import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import ChatController from '../../controllers/ChatController';
import stubImage from '../../images/chat.svg';
import Avatar from '../../components/avatar/index';
import IconButton from '../../components/iconButton/index';
import DropdownMenu from '../../components/dropdownMenu';
import Search from '../../components/search/index';
import ChatList from './chatList';
import { ChatMessagesConnect } from './chatMessages';
import ChatForm from './chatForm/index';
import CreateNewChatPopup from '../../components/popup/createNewChatPopup';
import RemoveChatPopup from '../../components/popup/removeChatPopup';
import ChangeChatAvatarPopup from '../../components/popup/changeChatAvatarPopup';
import ViewChatUsersPopup from '../../components/popup/viewChatUsers';
import АddUsersToChatPopup from '../../components/popup/addUsersToChatPopup';
import RemoveUsersFromChatPopup from '../../components/popup/removeUsersFromChat';
import router from '../../router';
import isEqual from '../../utils/isEqual';
import { IChat } from '../../interfaces/IChat';
import Indexed from '../../types/indexed';
import connect from '../../utils/connect';

export class Chat extends Component {
  constructor(tagName: string = 'main', propsAndChildren: Record<string, any>) {
    super(tagName, propsAndChildren);
    this.props.attr = { class: 'chat' };
    this.props.user = propsAndChildren.user;
    this.props.chats = propsAndChildren.chats;
    this.props.currentMessages = propsAndChildren.currentMessages;
    this.props.currentChat = {};
    this.props.isShowChat = false;
    this.props.isShowCreateChatPopup = false;
    this.props.isShowRemoveChatPopup = false;
    this.props.isShowChangeAvatarPopup = false;
    this.props.isShowViewChatUsersPopup = false;
    this.props.isShowAddUsersPopup = false;
    this.props.isShowRemoveUsersPopup = false;
    this.props.stubImage = stubImage;

    const {
      chats,
      isShowCreateChatPopup,
      isShowRemoveChatPopup,
      isShowChangeAvatarPopup,
      isShowViewChatUsersPopup,
      isShowAddUsersPopup,
      isShowRemoveUsersPopup,
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
        { icon: 'location', text: 'Локация', onClick: () => {} },
        { icon: 'file', text: 'Файл', onClick: () => {} },
        { icon: 'media', text: 'Фото или видео', onClick: () => {} },
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
    this.children.removeChatPopup = new RemoveChatPopup({ elemId: currentChat.id, isOpen: isShowRemoveChatPopup, onClose: this.closePopup.bind(this) });
    this.children.changeAvatarPopup = new ChangeChatAvatarPopup({
      elemId: currentChat.id,
      isOpen: isShowChangeAvatarPopup,
      onClose: this.closePopup.bind(this),
      onChange: (elem: IChat) => {
        this.setProps({ currentChat: elem });
      },
    });
    this.children.viewUsersPopup = new ViewChatUsersPopup({ isOpen: isShowViewChatUsersPopup, onClose: this.closePopup.bind(this) });
    this.children.addUsersPopup = new АddUsersToChatPopup({ isOpen: isShowAddUsersPopup, onClose: this.closePopup.bind(this) });
    this.children.removeUsersPopup = new RemoveUsersFromChatPopup({ isOpen: isShowRemoveUsersPopup, onClose: this.closePopup.bind(this) });
    this.children.chatForm = new ChatForm({});

    this.children.messageList = new ChatMessagesConnect('ul', {});

    this.children.chatList = new ChatList({
      chats,
      onClick: (elem) => {
        if (elem.id) {
          ChatController.setCurrentChat(elem.id);
          this.setProps({ isShowChat: true, currentChat: elem });
        }
      },
    });
  }

  componentDidMount() {
    const { user } = this.props;
    this.props.displayName = user.display_name || user.first_name;
    this.children.avatar = new Avatar({ url: user.avatar, size: 'small', isEdit: false });
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.user && newProps.user) {
      this.setProps({ displayName: newProps.user.display_name || newProps.user.first_name });
      if (this.children.avatar) {
        this.children.avatar.setProps({ url: newProps.user.avatar });
      }
    }
    if (oldProps.currentChat && newProps.currentChat) {
      if ((oldProps.currentChat !== newProps.currentChat)) {
        this.setProps({ currentChat: newProps.currentChat });
        if (this.children.addUsersPopup) {
          this.children.addUsersPopup.setProps({ elemId: newProps.currentChat.id });
        }
        if (this.children.removeChatPopup) {
          this.children.removeChatPopup.setProps({ elemId: newProps.currentChat.id });
        }
        if (this.children.changeAvatarPopup) {
          this.children.changeAvatarPopup.setProps({ elemId: newProps.currentChat.id });
        }
        if (this.children.viewUsersPopup) {
          this.children.viewUsersPopup.setProps({ elemId: newProps.currentChat.id });
        }
        if (this.children.removeUsersPopup) {
          this.children.removeUsersPopup.setProps({ elemId: newProps.currentChat.id });
        }
        if (this.children.chatAvatar) {
          this.children.chatAvatar.setProps({ url: newProps.currentChat.avatar });
        }
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
        icon: 'users',
        text: 'Список пользователей',
        onClick: () => {
          this.setProps({ isShowViewChatUsersPopup: true });
          this.children.viewUsersPopup.setProps({ isOpen: true });
          this.children.chatMenu.setProps({ isShow: false });
        },
      },
      {
        icon: 'add-user',
        text: 'Добавить пользователей',
        onClick: () => {
          this.setProps({ isShowAddUsersPopup: true });
          this.children.addUsersPopup.setProps({ isOpen: true });
          this.children.chatMenu.setProps({ isShow: false });
        },
      },
      {
        icon: 'remove-user',
        text: 'Удалить пользователей',
        onClick: () => {
          this.setProps({ isShowRemoveUsersPopup: true });
          this.children.removeUsersPopup.setProps({ isOpen: true });
          this.children.chatMenu.setProps({ isShow: false });
        },
      },
      {
        icon: 'avatar',
        text: 'Изменить аватар',
        onClick: () => {
          this.setProps({ isShowChangeAvatarPopup: true });
          this.children.changeAvatarPopup.setProps({ isOpen: true });
          this.children.chatMenu.setProps({ isShow: false });
        },
      },
    ];
  }

  closeDropdownMenu() {
    this.children.chatMenu.setProps({ isShow: false });
    this.children.attachMenu.setProps({ isShow: false });
  }

  closePopup() {
    this.setProps({
      isShowCreateChatPopup: false,
      isShowRemoveChatPopup: false,
      isShowChangeAvatarPopup: false,
      isShowViewChatUsersPopup: false,
      isShowAddUsersPopup: false,
      isShowRemoveUsersPopup: false,
    });
    this.children.createChatPopup.setProps({ isOpen: false });
    this.children.removeChatPopup.setProps({ isOpen: false });
    this.children.changeAvatarPopup.setProps({ isOpen: false });
    this.children.viewUsersPopup.setProps({ isOpen: false });
    this.children.addUsersPopup.setProps({ isOpen: false });
    this.children.removeUsersPopup.setProps({ isOpen: false });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

function mapUserToProps(state: Indexed) {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    chats: state.chats,
    currentChat: state.currentChat,
    currentMessages: state.currentMessages,
  };
}

export const ChatConnect = connect(mapUserToProps)(Chat);
