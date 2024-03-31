import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface.ts';
import Form from '../../form/index.ts';
import ChatController from '../../../controllers/ChatController.ts';
import PopupUserList from '../components/popupUserList/index.ts';
import { IUser } from '../../../interfaces/IUser.ts';

export default class ViewChatUsersPopup extends Component {
  private onClose: () => void;

  private currentUsers: IUser[] = [];

  constructor(props: IPopup) {
    super('div', props);
    this.props.attr = { class: 'popup popup_opened' };
    this.props.isLoadingUsers = true;
    this.onClose = props.onClose;

    this.children.currentUsersList = new PopupUserList({ users: this.currentUsers, isActive: false });
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
        this.children.currentUsersList.setProps({ users: this.currentUsers });
      }
    }
    return true;
  }

  handleGetUsers(id: number) {
    ChatController.getChatUsers(id)
      .then((res: IUser[]) => {
        this.currentUsers = res;
        this.children.currentUsersList.setProps({ users: res });
        this.setProps({ isLoadingUsers: false });
      });
  }

  private renderForm() {
    const buttons = [
      {
        text: 'Назад',
        type: 'button',
        id: 'back-btn',
        color: 'primary',
        onClick: this.onClose,
      },
    ];

    this.children.form = new Form({
      name: 'form-view-chat-users',
      buttons,
      error: { text: '' },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
