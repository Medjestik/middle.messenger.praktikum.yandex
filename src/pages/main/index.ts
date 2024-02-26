import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import data from './data';
import Nav from '../../components/nav';

export default class Main extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    this.children.navigation = new Nav(({ links: data.links }));

    this.props.attr = { class: 'main' };
  }

  render() {
    return this.compile(template, { ...this.props, navigation: this.children.navigation });
  }
}
