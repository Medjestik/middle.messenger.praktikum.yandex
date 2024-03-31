import './styles/style.scss';
import Registration from './pages/registration/index.ts';
import Login from './pages/login/index.ts';
import { ChatConnect } from './pages/chat/index.ts';
import { ProfileConnect } from './pages/profile/index.ts';
import NotFoundPage from './pages/404/index.ts';
import InternalErrorPage from './pages/500/index.ts';
import router from './router.ts';
import Store from './services/Store.ts';
import AuthController from './controllers/AuthController.ts';
import ChatController from './controllers/ChatController.ts';

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
