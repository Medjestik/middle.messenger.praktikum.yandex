import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import IFormField from './interface.ts';
import FormInput from '../formInput/index.ts';
import FormFile from '../formFile/index.ts';
import checkValidInput from '../../../utils/checkValidInput.ts';

export default class FormField extends Component {
  constructor(props: IFormField) {
    super('li', props);
    const {
      id,
      name,
      type,
      value,
      validation,
    } = props;

    this.props.attr = { class: 'form__field' };
    if (type === 'file') {
      this.children.formInput = new FormFile({
        id,
        text: 'Выберите файл..',
        name,
        type,
        onChange: (e: Event) => {
          const fileInput = e.target as HTMLInputElement;
          const file = fileInput.files && fileInput.files[0];
          if (file && file.type.startsWith('image/')) {
            this.props.attr = { class: 'form__field' };
            this.children.formInput.setProps({ text: file.name });
          } else {
            this.children.formInput.setProps({ text: 'Выберите файл..' });
            this.props.attr = { class: 'form__field form__field_type_error' };
          }
        },
      });
    } else {
      this.children.formInput = new FormInput({
        id,
        name,
        type,
        value,
        required: validation?.required,
        events: {
          blur: (e: Event) => {
            if (validation?.required) {
              const target = e.target as HTMLInputElement;
              const isValid = validation.pattern ? checkValidInput(target.value, validation.pattern) : true;
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
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
