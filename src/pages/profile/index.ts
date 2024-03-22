import Component from '../../services/Component';
import template from './template.hbs?raw';
import './style.scss';
import data from './data';
import Avatar from '../../components/avatar/index';
import ProfileField from './profileField/index';

export default class Profile extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);
    const { user } = props;

    const dataFields = data.fields.map((elem) => new ProfileField({
      ...elem, isControl: false, attr: { class: 'profile__field' },
    }));

    const editDataField = new ProfileField({
      text: 'Изменить данные', isControl: true, attr: { class: 'profile__field profile__field_margin_auto' },
    });

    const changePasswordField = new ProfileField({
      text: 'Изменить пароль', isControl: true, attr: { class: 'profile__field' },
    });

    const logoutField = new ProfileField({
      text: 'Выйти', isControl: true, attr: { class: 'profile__field profile__field_type_logout' },
    });

    this.props.title = user.displayName;
    this.children.avatar = new Avatar({ url: user.avatar, size: 'large', isEdit: true });
    this.lists.fields = [...dataFields, editDataField, changePasswordField, logoutField];
    this.props.attr = { class: 'profile' };
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
