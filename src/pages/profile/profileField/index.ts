import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IFormField from './interface';

export default class ProfileField extends Component {
  constructor(props: IFormField) {
    super('li', props);
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
