import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import data from './data';
import AuthController from '../../controllers/AuthController';
import { IAuthLogin } from '../../interfaces/IAuthData';
import Form from '../../components/form/index';

export default class Login extends Component {
  constructor(tagName: string = 'main', propsAndChildren = {}) {
    super(tagName, propsAndChildren);

    const { image, form } = data;

    const handleFormSubmit = (formObject: { [key: string]: FormDataEntryValue }) => {
      const formDataObject: IAuthLogin = {
        login: formObject.login as string,
        password: formObject.password as string,
      };
      AuthController.login(formDataObject);
      this.children.form.setProps({ title: 'Test' });
    };

    this.props.image = image;
    this.props.attr = { class: 'login' };

    this.children.form = new Form({
      name: 'form-login',
      title: 'Вход',
      fields: form.fields,
      buttons: form.buttons,
      link: { url: '/sign-up', text: 'Нет аккаунта?' },
      error: { text: '' },
      onSubmit: handleFormSubmit,
    });
  }

  render() {
    return this.compile(template, { ...this.props, form: this.children.form });
  }
}
