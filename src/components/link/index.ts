import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import ILink from './interface.ts';
import router from '../../router.ts';

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
