import Component from '../../../../../services/Component';
import template from './template.hbs?raw';
import { IPopupUserItem } from '../interface';
import Avatar from '../../../../avatar';

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
