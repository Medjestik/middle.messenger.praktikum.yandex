import './styles/style.scss';
import Registration from './pages/registration/index';
import Login from './pages/login/index';
import Chat from './pages/chat/index';
import Profile from './pages/profile/index';
import NotFoundPage from './pages/404/index';
import InternalErrorPage from './pages/500/index';
import router from './router';
import Store from './services/Store';
import AuthController from './controllers/AuthController';
import ChatController from './controllers/ChatController';

function setupRoutes() {
  router
    .use('/', Login)
    .use('/sign-up', Registration)
    .use('/messenger', Chat)
    .use('/settings', Profile)
    .use('/404', NotFoundPage)
    .use('/500', InternalErrorPage)
    .start();
}

async function initApp() {
  try {
    await AuthController.getUser();
    await ChatController.getChats();
    setupRoutes();
    //const currentPath = window.location.pathname;
    //router.go(currentPath);
  } catch (error) {
    console.error('Ошибка во время инициализации приложения:', error);
  }
}

initApp();
