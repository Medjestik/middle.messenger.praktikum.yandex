import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import IFormTitle from './interface.ts';

export default class FormTitle extends Component {
  constructor(props: IFormTitle) {
    super('h2', props);

    this.props.attr = { class: 'form__title' };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
