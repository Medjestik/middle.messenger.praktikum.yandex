import connect from '../../utils/connect';
import Chat from './chat';
import Indexed from '../../types/indexed';

function mapUserToProps(state: Indexed) {
  return {
    chats: state.chats,
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(Chat, mapUserToProps);
