import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormButton from './interface';

export default class FormButton extends Component {
  constructor(props: IFormButton) {
    super('button', props);
    const { color } = this.props;

    this.props.attr = { class: `form__button form__button_color_${color}` };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
