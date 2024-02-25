import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import data from './data.ts';
import Link from '../../components/link/index.ts';
import ILink from '../../components/link/interface.ts';

export default class Main extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    const navLinks = data.links.map((elem: ILink, i: number) => new Link({
      text: `${i + 1}. ${elem.text}`, attr: { class: 'link mt-20 fs-20', href: elem.url },
    }));

    this.lists.links = navLinks;

    this.props.attr = { class: 'main' };
  }

  render() {
    return this.compile(template, { ...this.props, navigation: this.children.navigation });
  }
}
