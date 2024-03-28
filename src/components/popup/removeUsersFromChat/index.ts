import Component from '../../../services/Component';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface';
import Form from '../../form';
import ChatController from '../../../controllers/ChatController';
import PopupUserList from '../components/popupUserList';
import { IUser } from '../../../interfaces/IUser';

export default class RemoveUsersFromChatPopup extends Component {
  private onClose: () => void;

  private currentUsers: IUser[] = [];

  private removedUsers: IUser[] = [];

  constructor(props: IPopup) {
    super('div', props);
    this.props.attr = { class: 'popup popup_opened' };
    this.onClose = props.onClose;

    this.children.currentUsersList = new PopupUserList({ users: this.currentUsers, isActive: true, onClick: this.handleUserClick });
    this.children.removedUsersList = new PopupUserList({ users: this.removedUsers, isActive: false });
    this.renderForm();
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.isOpen !== newProps.isOpen && this.children.currentUsersList) {
      this.setProps({ elemId: newProps.elemId });
      if (newProps.isOpen) {
        this.setProps({ isLoadingUsers: true });
        this.handleGetUsers(newProps.elemId);
      } else {
        this.currentUsers = [];
        this.removedUsers = [];
        this.children.currentUsersList.setProps({ users: this.currentUsers });
        this.children.removedUsersList.setProps({ users: this.removedUsers });
      }
    }
    return true;
  }

  handleUserClick = (user: IUser) => {
    this.currentUsers = this.currentUsers.filter((elem) => elem.id !== user.id);
    this.removedUsers = [...this.removedUsers, user];
    this.children.currentUsersList.setProps({ users: this.currentUsers });
    this.children.removedUsersList.setProps({ users: this.removedUsers });
  };

  handleFormSubmit = () => {
    const { elemId } = this.props;

    if (this.removedUsers.length > 0) {
      const userIds = this.removedUsers.filter((user) => user.id !== undefined).map((user) => user.id) as number[];
      ChatController.removeUsersFromChat({ users: userIds, chatId: elemId })
        .then(() => {
          this.onClose();
        });
    }
  };

  handleGetUsers(id: number) {
    ChatController.getChatUsers(id)
      .then((res: IUser[]) => {
        this.currentUsers = res.filter((elem) => elem.role !== 'admin');
        this.children.currentUsersList.setProps({ users: this.currentUsers });
        this.setProps({ isLoadingUsers: false });
      });
  }

  private renderForm() {
    const buttons = [
      {
        text: 'Отменить',
        type: 'button',
        id: 'cancel-btn',
        color: 'cancel',
        onClick: this.onClose,
      },
      {
        text: 'Сохранить',
        type: 'submit',
        id: 'submit-btn',
        color: 'primary',
      },
    ];

    this.children.form = new Form({
      name: 'form-remove-users-from-chat',
      buttons,
      error: { text: '' },
      onSubmit: this.handleFormSubmit,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
