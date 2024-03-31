import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import ErrorPage from '../../components/errorPage/index.ts';
import img from '../../images/404.svg';
import Store from '../../services/Store.ts';

export default class NotFoundPage extends Component {
  constructor(tagName: string = 'main', propsAndChildren = {}) {
    super(tagName, propsAndChildren);
    this.props.attr = { class: 'not-found' };
  }

  componentDidMount() {
    const { isLoggedIn } = Store.getState();
    this.children.page = new ErrorPage({
      title: 'Мы не нашли того, что вы искали',
      img,
      link: {
        url: `${isLoggedIn ? '/messenger' : '/'}`,
        text: 'Вернуться',
      },
    });
  }

  render() {
    return this.compile(template, { page: this.children.page });
  }
}
