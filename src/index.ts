import './styles/style.scss';
import RenderDOM from './services/RenderDOM';
import Main from './pages/main/index';
import Registration from './pages/registration/index';
import Login from './pages/login/index';
import Chat from './pages/chat/index';
import Profile from './pages/profile/index';
import Edit from './pages/edit/index';
import NotFoundPage from './pages/404/index';
import InternalErrorPage from './pages/500/index';

const appElement = document.querySelector('.app');

const userContext = {
  displayName: 'Ivan',
  avatar: 'https://img.razrisyika.ru/kart/95/1200/377029-magistr-yoda-37.jpg',
};

if (appElement) {
  switch (window.location.pathname) {
    case '/registration':
      RenderDOM('.app', new Registration({}));
      break;
    case '/login':
      RenderDOM('.app', new Login({}));
      break;
    case '/chat':
      RenderDOM('.app', new Chat({ user: userContext }));
      break;
    case '/profile':
      RenderDOM('.app', new Profile({ user: userContext }));
      break;
    case '/edit':
      RenderDOM('.app', new Edit({}));
      break;
    case '/404':
      RenderDOM('.app', new NotFoundPage({}));
      break;
    case '/500':
      RenderDOM('.app', new InternalErrorPage({}));
      break;
    default:
      RenderDOM('.app', new Main({}));
  }
} else {
  throw new Error('App not found');
}
