import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormInput from './interface';

export default class FormInput extends Component {
  constructor(props: IFormInput) {
    super('input', props);

    const {
      id,
      name,
      type,
      required,
    } = props;

    this.props.attr = {
      class: 'form__input',
      id,
      name,
      type,
      required: required ? 'required' : undefined,
    };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
