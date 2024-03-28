import Component from '../../../../services/Component';
import template from './template.hbs?raw';
import { IPopupUserList } from './interface';
import PopupUserItem from './popupUserItem';
import diffArrays from '../../../../utils/diffArrays';
import { IUser } from '../../../../interfaces/IUser';

export default class PopupUserList extends Component {
  constructor(props: IPopupUserList) {
    super('ul', props);
    const { users, isActive } = props;
    this.props.attr = { class: `popup__list ${isActive ? 'popup__list_type_active' : ''} scroll` };
    this.props.users = props.users;
    this.lists.users = this.renderUsers(users);
  }

  componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (oldProps.users && newProps.users && this.lists.users) {
      if (newProps.users.length > 0) {
        const addedUsers = diffArrays<IUser>(oldProps.users, newProps.users, 'id').added;
        const removedUsers = diffArrays<IUser>(oldProps.users, newProps.users, 'id').removed;
        addedUsers.forEach((elem: IUser) => {
          this.lists.users.unshift(this.createUserItem(elem));
        });
        removedUsers.forEach((elem: IUser) => {
          const index = this.lists.users.findIndex((user: PopupUserItem) => user.props.id === elem.id);
          if (index !== -1) {
            this.lists.users.splice(index, 1);
          }
        });
      } else {
        this.lists.users.splice(0, this.lists.users.length);
      }
    }
    return true;
  }

  createUserItem(user: IUser) {
    const { onClick } = this.props;
    return new PopupUserItem({
      id: user.id,
      avatar: user.avatar,
      firstName: user.first_name,
      secondName: user.second_name,
      login: user.login,
      displayName: user.display_name,
      events: {
        click: () => {
          if (onClick) {
            onClick(user);
          }
        },
      },
    });
  }

  renderUsers(users: IUser[]) {
    return users.map((user: IUser) => this.createUserItem(user));
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
