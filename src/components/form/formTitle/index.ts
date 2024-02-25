import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormTitle from './interface';

export default class FormTitle extends Component {
  constructor(props: IFormTitle) {
    super('h2', props);

    this.props.attr = { class: 'form__title' };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
