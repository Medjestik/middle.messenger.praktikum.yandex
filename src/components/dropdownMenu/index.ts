import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import IDropdownMenu from './interface.ts';
import DropdownItem from './dropdownItem/index.ts';

interface DropdownOption {
  text: string;
  icon: string;
  onClick: () => void;
}

export default class DropdownMenu extends Component {
  constructor(props: IDropdownMenu) {
    super('div', props);

    const { options, position } = props;
    this.props.attr = { id: 'drop-down', class: `dropdown dropdown_position_${position} dropdown_type_hide` };

    if (options !== undefined) {
      this.lists.items = options.map((option: DropdownOption) => new DropdownItem({
        text: option.text,
        icon: option.icon,
        events: {
          click: () => {
            option.onClick();
          },
        },
      }));
    }
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.isShow !== newProps.isShow) {
      if (newProps.isShow) {
        this.props.attr = { class: `dropdown dropdown_position_${newProps.position} dropdown_type_show` };
        document.addEventListener('click', this.handleClickOutside);
      } else {
        this.props.attr = { class: `dropdown dropdown_position_${newProps.position} dropdown_type_hide` };
        document.removeEventListener('click', this.handleClickOutside);
      }
    }
    if (oldProps.options !== newProps.options) {
      if (this.lists.items) {
        this.lists.items = newProps.options.map((option: DropdownOption) => new DropdownItem({
          text: option.text,
          icon: option.icon,
          events: {
            click: () => {
              option.onClick();
            },
          },
        }));
      }
    }
    return true;
  }

  handleClickOutside = (event: MouseEvent) => {
    if (!event.target || !(event.target instanceof HTMLElement)) {
      return;
    }
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.dropdown') && !targetElement.closest('.icon-button ')) {
      const { onClose } = this.props;
      onClose();
    }
  };

  render() {
    return this.compile(template, { ...this.props });
  }
}
