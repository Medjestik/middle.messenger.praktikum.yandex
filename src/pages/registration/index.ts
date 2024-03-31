import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import data from './data.ts';
import AuthController from '../../controllers/AuthController.ts';
import { IAuthRegistration } from '../../interfaces/IAuthData.ts';
import Form from '../../components/form/index.ts';

export default class Registration extends Component {
  constructor(tagName: string = 'main', propsAndChildren = {}) {
    super(tagName, propsAndChildren);

    const { image, form } = data;

    const handleFormSubmit = (formObject: { [key: string]: FormDataEntryValue }) => {
      const formDataObject: IAuthRegistration = {
        first_name: formObject.first_name as string,
        second_name: formObject.second_name as string,
        login: formObject.login as string,
        email: formObject.email as string,
        phone: formObject.phone as string,
        password: formObject.password as string,
      };
      AuthController.registration(formDataObject);
    };

    this.props.image = image;
    this.props.attr = { class: 'registration' };

    this.children.form = new Form({
      name: 'form-registration',
      title: 'Регистрация',
      fields: form.fields,
      buttons: form.buttons,
      link: { url: '/', text: 'Уже есть аккаунт?' },
      error: { text: '' },
      onSubmit: handleFormSubmit,
    });
  }

  render() {
    return this.compile(template, { ...this.props, form: this.children.form });
  }
}
