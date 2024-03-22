import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import INav from './interface';
import NavList from './navList';

export default class Nav extends Component {
  constructor(props: INav) {
    super('nav', props);

    this.children.navList = new NavList({ links: props.links });

    this.props.attr = { class: 'nav' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
