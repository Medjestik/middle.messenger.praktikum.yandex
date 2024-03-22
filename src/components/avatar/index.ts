import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import IAvatar from './interface';
import checkValidUrl from '../../utils/checkValidUrl';

export default class Avatar extends Component {
  constructor(props: IAvatar) {
    super('div', props);
    const { url, size, isEdit } = props;

    if (typeof url === 'string') {
      this.props.isValid = checkValidUrl(url);
    } else {
      this.props.url = '';
    }

    this.props.attr = { class: `avatar avatar_size_${size} ${isEdit ? 'avatar_action_edit' : ''}` };
  }

  componentDidUpdate(oldProps: IAvatar, newProps: IAvatar) {
    if (oldProps.url !== newProps.url) {
      if (typeof newProps.url === 'string') {
        this.props.isValid = checkValidUrl(newProps.url);
      } else {
        this.props.url = '';
      }
    }
    return true;
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
