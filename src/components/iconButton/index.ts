import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import IIconButton from './interface';

export default class IconButton extends Component {
  constructor(props: IIconButton) {
    super('button', props);

    const {
      icon,
      type,
      size,
    } = props;

    this.props.attr = { class: `icon-button icon-button_type_${icon} icon-button_size_${size}`, type };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
