import Component from '../../../services/Component';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface';
import Form from '../../form';
import Store from '../../../services/Store';
import ProfileController from '../../../controllers/ProfileController';
import { IProfileUserData } from '../../../interfaces/IProfileData';

export default class EditUserDataPopup extends Component {
  private onClose: () => void;

  constructor(props: IPopup) {
    super('div', props);
    this.props.attr = { class: 'popup popup_opened' };
    this.onClose = props.onClose;
  }

  componentDidMount() {
    this.renderForm();
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.isOpen !== newProps.isOpen) {
      this.renderForm();
    }
    return true;
  }

  handleFormSubmit = (formObject: { [key: string]: FormDataEntryValue }) => {
    const formDataObject: IProfileUserData = {
      first_name: formObject.first_name as string,
      second_name: formObject.second_name as string,
      display_name: formObject.display_name as string,
      login: formObject.login as string,
      email: formObject.email as string,
      phone: formObject.phone as string,
    };
    ProfileController.changeUserData(formDataObject)
      .then(() => {
        this.onClose();
      });
  };

  private renderForm() {
    const { user } = Store.getState();
    const fields = [
      {
        caption: 'Имя',
        type: 'text',
        id: 'edit-data-input-firstName',
        name: 'first_name',
        value: user.first_name,
        validation: {
          required: true,
          pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
          errorText: 'Неправильный формат имени',
        },
      },
      {
        caption: 'Фамилия',
        type: 'text',
        id: 'edit-data-input-secondName',
        name: 'second_name',
        value: user.second_name,
        validation: {
          required: true,
          pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яё-]*$/,
          errorText: 'Неправильный формат фамилии',
        },
      },
      {
        caption: 'Имя в чате',
        type: 'text',
        id: 'edit-data-input-display-name',
        name: 'display_name',
        value: user.display_name,
        validation: {
          required: true,
          pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
          errorText: 'Неправильный формат имени в чате',
        },
      },
      {
        caption: 'Логин',
        type: 'text',
        id: 'edit-data-input-login',
        name: 'login',
        value: user.login,
        validation: {
          required: true,
          pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
          errorText: 'Неправильный формат логина',
        },
      },
      {
        caption: 'Почта',
        type: 'email',
        id: 'edit-data-input-mail',
        name: 'email',
        value: user.email,
        validation: {
          required: true,
          pattern: /^(?=.*[@])[a-zA-Z0-9_-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)+$/,
          errorText: 'Неправильный формат почты',
        },
      },
      {
        caption: 'Телефон',
        type: 'tel',
        id: 'edit-data-input-phone',
        name: 'phone',
        value: user.phone,
        validation: {
          required: true,
          pattern: /^\+?\d{10,15}$/,
          errorText: 'Неправильный формат телефона',
        },
      },
    ];
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
      name: 'form-edit-user-data',
      title: 'Изменение данных',
      fields,
      buttons,
      error: { text: '' },
      onSubmit: this.handleFormSubmit,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
