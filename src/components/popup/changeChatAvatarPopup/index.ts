import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface.ts';
import Form from '../../form/index.ts';
import ChatController from '../../../controllers/ChatController.ts';
import Store from '../../../services/Store.ts';

export default class ChangeChatAvatarPopup extends Component {
  private onClose: () => void;

  constructor(props: IPopup) {
    super('div', props);
    const { onChange } = this.props;
    this.props.attr = { class: 'popup popup_opened' };
    this.props.onChange = onChange;
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
    const chatId = String(Store.getState().currentChat.id);
    const data = new FormData();
    data.append('chatId', chatId);
    data.append('avatar', formObject.avatar);
    ChatController.changeChatAvatar(data)
      .then((res) => {
        const { onChange } = this.props;
        onChange(res);
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
      name: 'form-change-chat-avatar',
      title: 'Изменение аватара чата',
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
