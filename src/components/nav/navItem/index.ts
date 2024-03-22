import Component from '../../../services/Component';
import template from './template.hbs?raw';
import INavItem from './interface';
import Link from '../../link';

export default class NavItem extends Component {
  constructor(props: INavItem) {
    super('li', props);

    const { text, url } = props;

    this.children.link = new Link({
      text, attr: { class: 'link mt-20 fs-20', href: url },
    });

    this.props.attr = { class: 'nav__item' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
