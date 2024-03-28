import Component from '../../../services/Component';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface';
import Form from '../../form';
import ChatController from '../../../controllers/ChatController';
import { IChatCreateNew } from '../../../interfaces/IChatData';

export default class CreateNewChatPopup extends Component {
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
    const formDataObject: IChatCreateNew = {
      title: formObject.title as string,
    };
    ChatController.createNewChat(formDataObject)
      .then(() => {
        this.onClose();
      });
  };

  private renderForm() {
    const fields = [
      {
        caption: 'Название',
        type: 'text',
        id: 'new-chat-input-title',
        name: 'title',
        value: '',
        validation: {
          required: true,
          pattern: /^(?=[a-zA-Z0-9_-]{3,20}$)(?![0-9]+$)[a-zA-Z0-9_-]+$/,
          errorText: 'Неправильное название чата',
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
      name: 'form-create-new-chat',
      title: 'Создать чат',
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
