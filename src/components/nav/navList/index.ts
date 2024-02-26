import Component from '../../../services/Component';
import template from './template.hbs?raw';
import INavList from './interface';
import NavItem from '../navItem';
import INavItem from '../navItem/interface';

export default class NavList extends Component {
  constructor(props: INavList) {
    super('ul', props);

    const { links } = props;

    const navItems = links.map((elem: INavItem, i: number) => new NavItem({
      text: `${i + 1}. ${elem.text}`, url: elem.url, attr: { class: 'link mt-20 fs-20' },
    }));

    this.lists.navItems = navItems;

    this.props.attr = { class: 'nav__list' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
