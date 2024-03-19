import Component from '../../../../services/Component';
import template from './template.hbs?raw';
import IFormFileInput from './interface';

export default class FormFileInput extends Component {
  constructor(props: IFormFileInput) {
    super('input', props);

    const { type, name, id } = this.props;

    this.props.attr = {
      class: 'form__file-input',
      type,
      name,
      id,
    };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
