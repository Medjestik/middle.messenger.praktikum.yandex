import connect from '../../utils/connect';
import Profile from './profile';
import Indexed from '../../types/indexed';

function mapUserToProps(state: Indexed) {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
}

export default connect(Profile, mapUserToProps);
