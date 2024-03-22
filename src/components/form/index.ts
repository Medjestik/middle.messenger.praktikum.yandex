import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import FormTitle from './formTitle/index';
import FormField from './formField/index';
import FormButton from './formButton/index';
import Link from '../link/index';
import FormError from './formError/index';
import IForm from './interface';
import IFormField from './formField/interface';
import IFormButton from './formButton/interface';
import checkValidForm from '../../utils/checkValidForm';

export default class Form extends Component {
  constructor(props: IForm) {
    super('form', props);
    this.props = { ...props };

    const {
      name,
      title,
      fields,
      buttons,
      link,
    } = props;

    this.props.attr = { class: 'form', name, novalidate: 'novalidate' };
    this.props.events = {
      submit: (e: SubmitEvent) => {
        e.preventDefault();
        if (e.target && e.target instanceof HTMLFormElement) {
          const formData = new FormData(e.target);
          const formObject: { [key: string]: FormDataEntryValue } = {};
          formData.forEach((value, key) => {
            formObject[key] = value;
          });
          if (checkValidForm(formObject, fields)) {
            this.children.error.setProps({ text: '', attr: { class: 'form__error' } });
            console.log('Данные из формы:', formObject);
          } else {
            this.children.error.setProps({ text: 'Одно или несколько полей не прошли валидацию', attr: { class: 'form__error form__error_type_show' } });
          }
        }
      },
    };

    if (title !== undefined) {
      this.children.title = new FormTitle({ title });
    }

    if (link !== undefined) {
      this.children.link = new Link({ url: link.url, text: link.text, attr: { class: 'link mt-20 fs-16', href: link.url } });
    }

    if (fields !== undefined) {
      const formFields = fields.map((elem: IFormField) => new FormField({
        ...elem,
      }));
      this.lists.fields = formFields;
    }

    if (buttons !== undefined) {
      const formButtons = buttons.map((elem: IFormButton) => new FormButton({
        ...elem, attr: { type: elem.type, id: elem.id },
      }));
      this.lists.buttons = formButtons;
    }

    this.children.error = new FormError({ text: '', attr: { class: 'form__error' } });
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
