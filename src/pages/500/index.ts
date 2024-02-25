import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import ErrorPage from '../../components/errorPage/index.ts';
import img from '../../images/500.svg';

export default class InternalErrorPage extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    this.children.page = new ErrorPage({
      title: 'На сервере произошла ошибка',
      img,
      link: {
        url: '/',
        text: 'Вернуться',
      },
    });

    this.props.attr = { class: 'internal-error' };
  }

  render() {
    return this.compile(template, { page: this.children.page });
  }
}
