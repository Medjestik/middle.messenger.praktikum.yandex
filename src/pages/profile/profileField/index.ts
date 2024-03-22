import Component from '../../../services/Component';
import template from './template.hbs?raw';
import IProfileField from './interface';

export default class ProfileField extends Component {
  constructor(props: IProfileField) {
    super('li', props);
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.text !== newProps.text) {
      this.setProps({ text: newProps.text });
    }
    return true;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
