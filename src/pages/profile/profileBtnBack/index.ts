import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import IProfileBtnBack from './interface.ts';

export default class ProfileBtnBack extends Component {
  constructor({ onClick, ...props }: IProfileBtnBack) {
    super('button', props);
    this.props.attr = { class: 'profile__nav-link', type: 'button' };
    this.props.events = {
      click: () => {
        onClick();
      },
    };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
