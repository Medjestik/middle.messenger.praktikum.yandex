import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import IChatForm from './interface';
import checkValidInput from '../../utils/checkValidInput';

export default class ChatForm extends Component {
  constructor(props: IChatForm) {
    super('form', props);

    this.props.attr = { class: 'chat-form' };

    this.props.events = {
      submit: (e: SubmitEvent) => {
        e.preventDefault();
        if (e.target) {
          const form = e.target as HTMLFormElement;
          const input = (form).querySelector('input[name="message"]');
          if (input instanceof HTMLInputElement) {
            const isValid = checkValidInput(input.value, /^\s*\S.*$/);
            if (isValid) {
              console.log('Сообщение:', input.value);
              form.reset();
            }
          }
        }
      },
    };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
