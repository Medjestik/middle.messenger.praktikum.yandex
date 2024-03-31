import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface.ts';
import Form from '../../form/index.ts';
import ProfileController from '../../../controllers/ProfileController.ts';

export default class ChangeUserAvatarPopup extends Component {
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
    const data = new FormData();
    data.append('avatar', formObject.avatar);
    ProfileController.changeUserAvatar(data)
      .then(() => {
        this.onClose();
      });
  };

  private renderForm() {
    const { onClose } = this.props;
    const fields = [
      {
        caption: 'Изображение',
        type: 'file',
        id: 'change-avatar-input-link',
        name: 'avatar',
        validation: {
          required: true,
          errorText: 'Пожалуйста, выберите изображение',
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
      name: 'form-change-user-avatar',
      title: 'Изменение аватара',
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
