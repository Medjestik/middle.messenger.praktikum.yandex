import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormSubtitle from './interface';

export default class FormSubtitle extends Component {
  constructor(props: IFormSubtitle) {
    super('p', props);

    this.props.attr = { class: 'form__subtitle' };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
