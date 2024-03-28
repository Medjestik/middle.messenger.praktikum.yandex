import Component from '../../../services/Component';
import template from './template.hbs?raw';
import '../style.scss';
import IDropdownItem from './interface';

export default class DropdownItem extends Component {
  constructor(props: IDropdownItem) {
    super('li', props);
    const { icon } = props;

    this.props.attr = { class: `dropdown__item dropdown__item_icon_${icon}` };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
