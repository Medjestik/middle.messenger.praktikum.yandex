import Component from '../../../../../services/Component';
import template from './template.hbs?raw';
import { IPopupSearchBtn } from '../interface';

export default class PopupSearchBtn extends Component {
  constructor(props: IPopupSearchBtn) {
    super('button', props);

    this.props.attr = { class: 'popup__search-btn', id: 'popup-search-button', type: 'button' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
