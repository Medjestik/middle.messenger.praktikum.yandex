import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import ILink from './interface';
import router from '../../router';

export default class Link extends Component {
  constructor(props: ILink) {
    super('a', props);

    const { url } = props;

    this.props.events = {
      click: (event: MouseEvent) => {
        event.preventDefault();
        if (url) {
          router.go(url);
        }
      },
    };
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
