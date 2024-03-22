import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import data from './data';
import Form from '../../components/form/index';

export default class Edit extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);

    const { form } = data;

    this.props.attr = { class: 'edit' };

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
