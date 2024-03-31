import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import IFormSubtitle from './interface.ts';

export default class FormSubtitle extends Component {
  constructor(props: IFormSubtitle) {
    super('p', props);

    this.props.attr = { class: 'form__subtitle' };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
