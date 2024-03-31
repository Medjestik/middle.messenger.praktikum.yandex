import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import { IUser } from '../../interfaces/IUser.ts';
import ProfileBtnBack from './profileBtnBack/index.ts';
import Avatar from '../../components/avatar/index.ts';
import ProfileField from './profileField/index.ts';
import EditUserDataPopup from '../../components/popup/editUserDataPopup/index.ts';
import ChangeUserPasswordPopup from '../../components/popup/changeUserPasswordPopup/index.ts';
import ChangeUserAvatarPopup from '../../components/popup/changeUserAvatarPopup/index.ts';
import AuthController from '../../controllers/AuthController.ts';
import router from '../../router.ts';
import connect from '../../utils/connect.ts';
import Indexed from '../../types/indexed.ts';

export class Profile extends Component {
  constructor(tagName: string = 'main', propsAndChildren: Record<string, any>) {
    super(tagName, propsAndChildren);
    this.props.attr = { class: 'profile' };
    this.props.isShowEditDataPopup = false;
    this.props.isShowChangePasswordPopup = false;
    this.props.isShowChangeAvatarPopup = false;
    const {
      user,
      isShowEditDataPopup,
      isShowChangePasswordPopup,
      isShowChangeAvatarPopup,
    } = this.props;

    this.props.title = user.display_name || user.first_name;
    this.children.btnBack = new ProfileBtnBack({ onClick: () => router.go('/messenger') });
    this.children.editDataPopup = new EditUserDataPopup({ isOpen: isShowEditDataPopup, onClose: this.closePopup.bind(this) });
    this.children.changePasswordPopup = new ChangeUserPasswordPopup({ isOpen: isShowChangePasswordPopup, onClose: this.closePopup.bind(this) });
    this.children.changeAvatarPopup = new ChangeUserAvatarPopup({ isOpen: isShowChangeAvatarPopup, onClose: this.closePopup.bind(this) });
    this.children.avatar = new Avatar({
      url: user.avatar,
      size: 'large',
      isEdit: true,
      events: {
        click: () => {
          this.setProps({ isShowChangeAvatarPopup: true });
          this.children.changeAvatarPopup.setProps({ isOpen: true });
        },
      },
    });
    this.children.editDataField = new ProfileField({
      text: 'Изменить данные',
      isControl: true,
      attr: { class: 'profile__field profile__field_margin_auto' },
      events: {
        click: () => {
          this.setProps({ isShowEditDataPopup: true });
          this.children.editDataPopup.setProps({ isOpen: true });
        },
      },
    });
    this.children.changePasswordField = new ProfileField({
      text: 'Изменить пароль',
      isControl: true,
      attr: { class: 'profile__field' },
      events: {
        click: () => {
          this.setProps({ isShowChangePasswordPopup: true });
          this.children.changePasswordPopup.setProps({ isOpen: true });
        },
      },
    });
    this.children.logoutField = new ProfileField({
      text: 'Выйти',
      isControl: true,
      attr: { class: 'profile__field profile__field_type_logout' },
      events: {
        click: () => {
          AuthController.logout();
        },
      },
    });
    const data = [
      { caption: 'Почта', text: user.email || '', name: 'email' },
      { caption: 'Логин', text: user.login || '', name: 'login' },
      { caption: 'Имя', text: user.first_name || '', name: 'first_name' },
      { caption: 'Фамилия', text: user.second_name || '', name: 'second_name' },
      { caption: 'Имя в чате', text: user.display_name || '', name: 'display_name' },
      { caption: 'Телефон', text: user.phone || '', name: 'phone' },
    ];
    this.lists.fields = data.map((elem) => new ProfileField({
      ...elem,
      isControl: false,
      attr: { class: 'profile__field' },
    }));
  }

  componentDidUpdate(newProps: Record<string, any>) {
    if (newProps.user) {
      this.setProps({ title: newProps.user.display_name || newProps.user.first_name });
      if (this.children.avatar) {
        this.children.avatar.setProps({ url: newProps.user.avatar });
      }
      if (this.lists.fields) {
        this.lists.fields.forEach((field: ProfileField) => {
          const fieldName: keyof IUser = field.props.name;
          field.setProps({ text: newProps.user[fieldName] });
        });
      }
    }
    return true;
  }

  closePopup() {
    this.setProps({ isShowEditDataPopup: false, isShowChangePasswordPopup: false, isShowChangeAvatarPopup: false });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

function mapUserToProps(state: Indexed) {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  };
}

export const ProfileConnect = connect(mapUserToProps)(Profile);
