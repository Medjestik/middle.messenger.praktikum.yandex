import Component from '../../../../../services/Component.ts';
import template from './template.hbs?raw';
import { IPopupSearchInput } from '../interface.ts';

export default class PopupSearchInput extends Component {
  private inputElement!: HTMLInputElement;

  constructor(props: IPopupSearchInput) {
    super('input', props);
    const { placeholder } = this.props;

    this.props.attr = {
      class: 'popup__search-input',
      id: 'popup-search-input',
      type: 'text',
      placeholder,
    };

    this.props.value = '';
  }

  componentDidMount() {
    this.inputElement = this.element as HTMLInputElement;
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.isOpen !== newProps.isOpen && this.inputElement) {
      this.inputElement.value = '';
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
