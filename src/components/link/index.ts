import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import ILink from './interface';

export default class Link extends Component {
  constructor(props: ILink) {
    super('a', props);
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
