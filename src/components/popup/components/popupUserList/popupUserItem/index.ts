import Component from '../../../../../services/Component.ts';
import template from './template.hbs?raw';
import { IPopupUserItem } from '../interface.ts';
import Avatar from '../../../../avatar/index.ts';

export default class PopupUserItem extends Component {
  constructor(props: IPopupUserItem) {
    super('li', props);
    this.props.attr = { class: 'popup__item' };
    const { avatar } = this.props;
    this.children.avatar = new Avatar({ url: avatar, size: 'small', isEdit: false });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
