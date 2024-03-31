import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import '../style.scss';
import IPopup from '../interface.ts';
import Form from '../../form/index.ts';
import ChatController from '../../../controllers/ChatController.ts';

export default class ConfirmRemovePopup extends Component {
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
      this.setProps({ elemId: newProps.elemId });
      this.renderForm();
    }
    return true;
  }

  handleFormSubmit = () => {
    const { elemId } = this.props;
    ChatController.removeChat({ chatId: elemId })
      .then(() => {
        this.onClose();
      });
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
        text: 'Удалить',
        type: 'submit',
        id: 'submit-btn',
        color: 'primary',
      },
    ];

    this.children.form = new Form({
      name: 'form-confirm-remove',
      title: 'Подтверждение удаления',
      subtitle: 'Вы действительно хотите отправить запрос на удаление?',
      buttons,
      error: { text: '' },
      onSubmit: this.handleFormSubmit,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
