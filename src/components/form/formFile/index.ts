import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormFile from './interface';
import FormFileInput from './formFileInput';

export default class FormFile extends Component {
  constructor(props: IFormFile) {
    super('div', props);

    const {
      type,
      name,
      id,
      onChange,
    } = this.props;

    this.props.attr = {
      class: 'form__file',
    };

    this.children.fileInput = new FormFileInput({
      id,
      name,
      type,
      events: {
        change: (e: Event) => {
          onChange(e);
        },
      },
    });
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
