import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import ErrorPage from '../../components/errorPage/index.ts';
import img from '../../images/404.svg';

export default class NotFoundPage extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    this.children.page = new ErrorPage({
      title: 'Мы не нашли того, что вы искали',
      img,
      link: {
        url: '/',
        text: 'Вернуться',
      },
    });

    this.props.attr = { class: 'not-found' };
  }

  render() {
    return this.compile(template, { page: this.children.page });
  }
}
