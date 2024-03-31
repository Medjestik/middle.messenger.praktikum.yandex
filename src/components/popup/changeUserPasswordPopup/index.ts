import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface.ts';
import Form from '../../form/index.ts';
import ProfileController from '../../../controllers/ProfileController.ts';
import { IProfileUserPassword } from '../../../interfaces/IProfileData.ts';

export default class ChangeUserPasswordPopup extends Component {
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
    const formDataObject: IProfileUserPassword = {
      oldPassword: formObject.oldPassword as string,
      newPassword: formObject.newPassword as string,
    };
    ProfileController.changeUserPassword(formDataObject)
      .then(() => {
        this.onClose();
      });
  };

  private renderForm() {
    const { onClose } = this.props;
    const fields = [
      {
        caption: 'Старый пароль',
        type: 'password',
        id: 'change-password-input-old-password',
        name: 'oldPassword',
        validation: {
          required: true,
          pattern: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
          errorText: 'Неправильный формат пароля',
        },
      },
      {
        caption: 'Новый пароль',
        type: 'password',
        id: 'change-password-input-new-password',
        name: 'newPassword',
        validation: {
          required: true,
          pattern: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
          errorText: 'Неправильный формат пароля',
        },
      },
      {
        caption: 'Повторите пароль',
        type: 'password',
        id: 'change-password-input-repeat-password',
        name: 'repeatPassword',
        validation: {
          required: true,
          pattern: /^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,40}$/,
          errorText: 'Неправильный формат пароля',
        },
      },
    ];
    const buttons = [
      {
        text: 'Отменить',
        type: 'button',
        id: 'cancel-btn',
        color: 'cancel',
        onClick: onClose,
      },
      {
        text: 'Сохранить',
        type: 'submit',
        id: 'submit-btn',
        color: 'primary',
      },
    ];

    this.children.form = new Form({
      name: 'form-change-user-password',
      title: 'Изменение пароля',
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
