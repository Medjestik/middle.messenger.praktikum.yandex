import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormButton from './interface';

export default class FormButton extends Component {
  constructor(props: IFormButton) {
    super('button', props);

    this.props.attr = { class: 'form__button' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
