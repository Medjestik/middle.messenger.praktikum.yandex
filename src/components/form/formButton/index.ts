import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import IFormButton from './interface.ts';

export default class FormButton extends Component {
  constructor(props: IFormButton) {
    super('button', props);

    this.props.attr = { class: 'form__button' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
