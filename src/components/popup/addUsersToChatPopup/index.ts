import Component from '../../../services/Component';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface';
import Form from '../../form';
import ProfileController from '../../../controllers/ProfileController';
import ChatController from '../../../controllers/ChatController';
import PopupSearch from '../components/popupSearch';
import PopupUserList from '../components/popupUserList';
import { IUser } from '../../../interfaces/IUser';

export default class АddUsersToChatPopup extends Component {
  private onClose: () => void;

  private searchedUsers: IUser[] = [];

  private addedUsers: IUser[] = [];

  constructor(props: IPopup) {
    super('div', props);
    this.props.attr = { class: 'popup popup_opened' };
    const { isOpen } = this.props;
    this.onClose = props.onClose;

    this.children.searchedUsersList = new PopupUserList({ users: this.searchedUsers, isActive: true, onClick: this.handleUserClick });
    this.children.addedUsersList = new PopupUserList({ users: this.addedUsers, isActive: false });
    this.children.popupSearch = new PopupSearch({ isOpen, placeholder: 'Введите логин..', onSearch: this.handleSearchUser });
    this.renderForm();
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.isOpen !== newProps.isOpen) {
      this.searchedUsers = [];
      this.addedUsers = [];
      this.children.searchedUsersList.setProps({ users: this.searchedUsers });
      this.children.addedUsersList.setProps({ users: this.addedUsers });
      this.children.popupSearch.setProps({ isOpen: newProps.isOpen });
      this.setProps({ elemId: newProps.elemId });
    }
    return true;
  }

  handleSearchUser = (text: string) => {
    ProfileController.searchUsers({ login: text })
      .then((res) => {
        const users = res as IUser[];
        this.searchedUsers = users;
        this.children.searchedUsersList.setProps({ users });
      });
  };

  handleUserClick = (user: IUser) => {
    this.addedUsers = [...this.addedUsers, user];
    this.searchedUsers = this.searchedUsers.filter((elem) => elem.id !== user.id);
    this.children.addedUsersList.setProps({ users: this.addedUsers });
    this.children.searchedUsersList.setProps({ users: this.searchedUsers });
  };

  handleFormSubmit = () => {
    const { elemId } = this.props;

    if (this.addedUsers.length > 0) {
      const userIds = this.addedUsers.filter((user) => user.id !== undefined).map((user) => user.id) as number[];
      ChatController.addUsersToChat({ users: userIds, chatId: elemId })
        .then(() => {
          this.onClose();
        });
    }
  };

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
      name: 'form-add-users-to-chat',
      buttons,
      error: { text: '' },
      onSubmit: this.handleFormSubmit,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
