import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import data from './data.ts';
import Form from '../../components/form/index.ts';

export default class Login extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    const { image, form } = data;

    this.props.image = image;
    this.props.attr = { class: 'login' };

    this.children.form = new Form({
      name: 'form-login',
      title: 'Вход',
      fields: form.fields,
      buttons: form.buttons,
      link: { url: '/registration', text: 'Нет аккаунта?' },
      error: { text: '' },
    });
  }

  render() {
    return this.compile(template, { ...this.props, form: this.children.form });
  }
}
