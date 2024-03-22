import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import data from './data';
import Form from '../../components/form/index';

export default class Registration extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    const { image, form } = data;

    this.props.image = image;
    this.props.attr = { class: 'login' };

    this.children.form = new Form({
      name: 'form-registration',
      title: 'Регистрация',
      fields: form.fields,
      buttons: form.buttons,
      link: { url: '/login', text: 'Уже есть аккаунт?' },
      error: { text: '' },
    });
  }

  render() {
    return this.compile(template, { ...this.props, form: this.children.form });
  }
}
