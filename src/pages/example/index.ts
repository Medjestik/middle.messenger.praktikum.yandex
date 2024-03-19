import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import data from './data';
import Form from '../../components/form';

export default class Example extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    this.props.attr = { class: 'example' };

    const { form } = data;

    this.children.form = new Form({
      name: 'form-edit',
      title: 'Редактирование данных',
      fields: form.fields,
      buttons: form.buttons,
      error: { text: '' },
    });
  }

  render() {
    return this.compile(template, { ...this.props, form: this.children.form });
  }
}
