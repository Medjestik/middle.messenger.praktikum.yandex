import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IProfileBtnBack from './interface';

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
