import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormField from './interface';
import FormInput from '../formInput/index';
import checkValidInput from '../../../utils/checkValidInput';

export default class FormField extends Component {
  constructor(props: IFormField) {
    super('li', props);
    const {
      id,
      name,
      type,
      validation,
    } = props;

    this.props.attr = { class: 'form__field' };

    this.children.formInput = new FormInput({
      id,
      name,
      type,
      required: validation?.required,
      events: {
        blur: (e: Event) => {
          if (validation?.required) {
            const target = e.target as HTMLInputElement;
            const isValid = checkValidInput(target.value, validation.pattern);
            if (!isValid) {
              this.props.attr = { class: 'form__field form__field_type_error' };
            } else {
              this.props.attr = { class: 'form__field' };
            }
          }
        },
      },
    });
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
