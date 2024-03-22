import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import ISearch from './interface';

export default class Search extends Component {
  constructor(props: ISearch) {
    super('div', props);

    this.props.attr = { class: 'search' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
