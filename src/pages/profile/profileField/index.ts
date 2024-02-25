import Component from '../../../services/Component.ts';
import template from './template.hbs?raw';
import IFormField from './interface.ts';

export default class ProfileField extends Component {
  constructor(props: IFormField) {
    super('li', props);
  }

  render() {
    return this.compile(template as string, { ...this.props });
  }
}
