import './styles/style.scss';
import Registration from './pages/registration/index';
import Login from './pages/login/index';
import { ChatConnect } from './pages/chat';
import { ProfileConnect } from './pages/profile';
import NotFoundPage from './pages/404/index';
import InternalErrorPage from './pages/500/index';
import router from './router';
import Store from './services/Store';
import AuthController from './controllers/AuthController';
import ChatController from './controllers/ChatController';

const RouterPath = {
  login: '/',
  registration: '/sign-up',
  chat: '/messenger',
  profile: '/settings',
  notFound: '/404',
  internalError: '/500',
};

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(RouterPath.login, Login)
    .use(RouterPath.registration, Registration)
    .use(RouterPath.chat, ChatConnect)
    .use(RouterPath.profile, ProfileConnect)
    .use(RouterPath.notFound, NotFoundPage)
    .use(RouterPath.internalError, InternalErrorPage);

  let isProtectedRoute = false;
  let protectedRoutes = [];

  await AuthController.getUser();
  if (Store.getState().isLoggedIn) {
    protectedRoutes = [RouterPath.login, RouterPath.registration];
    if (protectedRoutes.includes(window.location.pathname)) {
      isProtectedRoute = true;
    }
    await ChatController.getChats();
  } else {
    protectedRoutes = [RouterPath.chat, RouterPath.profile];
    if (protectedRoutes.includes(window.location.pathname)) {
      isProtectedRoute = true;
    }
  }

  const unprotectedRoutes = [RouterPath.login, RouterPath.registration, RouterPath.notFound];
  if (!unprotectedRoutes.includes(window.location.pathname)) {
    isProtectedRoute = true;
  }

  try {
    router.start();

    if (!Object.values(RouterPath).includes(window.location.pathname)) {
      router.go(RouterPath.notFound);
    } else {
      if (Store.getState().isLoggedIn && isProtectedRoute) {
        if (window.location.pathname !== RouterPath.profile) {
          router.go(RouterPath.chat);
        }
      }
      if (!Store.getState().isLoggedIn && isProtectedRoute) {
        router.go(RouterPath.login);
      }
    }
  } catch (e) {
    router.start();

    router.go(RouterPath.internalError);
  }
});
