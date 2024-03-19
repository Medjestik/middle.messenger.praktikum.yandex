import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import IErrorPage from './interface';
import Link from '../link/index';

export default class ErrorPage extends Component {
  constructor(props: IErrorPage) {
    super('div', props);

    const { link } = props;

    if (link !== undefined) {
      this.children.link = new Link({
        text: link.text,
        url: link.url,
        attr: { class: 'link mt-20 fs-20' },
      });
    }

    this.props.attr = { class: 'error-page' };
  }

  render() {
    return this.compile(template, { ...this.props, link: this.children.link });
  }
}
