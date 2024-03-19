import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import ErrorPage from '../../components/errorPage/index';
import img from '../../images/500.svg';
import Store from '../../services/Store';

export default class InternalErrorPage extends Component {
  constructor(tagName: string = 'main', propsAndChildren = {}) {
    super(tagName, propsAndChildren);
    this.props.attr = { class: 'internal-error' };
  }

  componentDidMount() {
    const { isLoggedIn } = Store.getState();
    this.children.page = new ErrorPage({
      title: 'На сервере произошла ошибка',
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
