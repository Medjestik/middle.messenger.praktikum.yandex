import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import IFormError from './interface.ts';

export default class FormError extends Component {
  constructor(props: IFormError) {
    super('span', props);
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
