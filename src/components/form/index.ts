import Component from '../../services/Component.ts';
import template from './template.hbs?raw';
import './style.scss';
import FormTitle from './formTitle/index.ts';
import FormSubtitle from './formSubtitle/index.ts';
import FormField from './formField/index.ts';
import FormButton from './formButton/index.ts';
import Link from '../link/index.ts';
import FormError from './formError/index.ts';
import IForm from './interface.ts';
import IFormField from './formField/interface.ts';
import IFormButton from './formButton/interface.ts';
import checkValidForm from '../../utils/checkValidForm.ts';

export default class Form extends Component {
  constructor(props: IForm) {
    super('form', props);
    this.props = { ...props };

    const {
      name,
      title,
      subtitle,
      fields,
      buttons,
      link,
      onSubmit,
    } = props;

    this.props.title = props.title;

    this.props.attr = { class: 'form', name, novalidate: 'novalidate' };
    this.props.events = {
      submit: (e: SubmitEvent) => {
        e.preventDefault();
        const formObject: { [key: string]: string | File } = {};
        if (fields) {
          if (e.target && e.target instanceof HTMLFormElement) {
            const formData = new FormData(e.target);
            formData.forEach((value, key) => {
              if (value instanceof File) {
                formObject[key] = value;
              } else {
                formObject[key] = value as string;
              }
            });
            if (checkValidForm(formObject, fields)) {
              this.children.error.setProps({ text: '', attr: { class: 'form__error' } });
              if (onSubmit) {
                onSubmit(formObject);
              }
            } else {
              this.children.error.setProps({ text: 'Одно или несколько полей не прошли валидацию', attr: { class: 'form__error form__error_type_show' } });
            }
          }
        } else if (onSubmit) {
          onSubmit(formObject);
        } else {
          this.children.error.setProps({ text: 'К сожалению, произошла ошибка', attr: { class: 'form__error form__error_type_show' } });
        }
      },
    };

    if (title !== undefined) {
      this.children.title = new FormTitle({ title });
    }

    if (title !== undefined) {
      this.children.subtitle = new FormSubtitle({ subtitle });
    }

    if (link !== undefined) {
      this.children.link = new Link({ url: link.url, text: link.text, attr: { class: 'link mt-20 fs-16' } });
    }

    if (fields !== undefined) {
      const formFields = fields.map((elem: IFormField) => new FormField({
        ...elem,
      }));
      this.lists.fields = formFields;
    }

    if (buttons !== undefined) {
      const formButtons = buttons.map((elem: IFormButton) => new FormButton({
        ...elem,
        attr: { type: elem.type, id: elem.id },
        events: {
          click: () => {
            if (elem.onClick) {
              elem.onClick();
            }
          },
        },
      }));
      this.lists.buttons = formButtons;
    }

    this.children.error = new FormError({ text: '', attr: { class: 'form__error' } });
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
