import Component from '../../../../services/Component';
import template from './template.hbs?raw';
import PopupSearchInput from './popupSearchInput';
import PopupSearchBtn from './popupSearchBtn';
import { IPopupSearch } from './interface';

export default class PopupSearch extends Component {
  private inputValue: string = '';

  constructor(props: IPopupSearch) {
    super('div', props);
    this.props.attr = { class: 'popup__search' };
    const { isOpen, placeholder, onSearch } = this.props;
    this.children.searchInput = new PopupSearchInput({
      isOpen,
      placeholder,
      events: {
        change: (e) => {
          const inputElement = e.target as HTMLInputElement;
          this.inputValue = inputElement.value;
        },
      },
    });
    this.children.searchBtn = new PopupSearchBtn({
      events: {
        click: () => {
          onSearch(this.inputValue);
        },
      },
    });
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.isOpen !== newProps.isOpen) {
      this.children.searchInput.setProps({ isOpen: newProps.isOpen });
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
