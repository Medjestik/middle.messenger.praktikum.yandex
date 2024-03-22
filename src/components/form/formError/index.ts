import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormError from './interface';

export default class FormError extends Component {
  constructor(props: IFormError) {
    super('span', props);

    this.props.attr = { class: 'form__error' };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
