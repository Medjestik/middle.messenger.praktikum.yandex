import Route from './Route';
import Component from './Component';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Router {
  private routes: Route[] = [];

  private history: History = window.history;

  private _currentRoute: Route | null = null;

  private _rootQuery: string;

  private static __instance: Router | null = null;

  constructor(rootQuery: string) {
    this._rootQuery = rootQuery;
  }

  static getInstance(rootQuery: string): Router {
    if (!Router.__instance) {
      Router.__instance = new Router(rootQuery);
    }
    return Router.__instance;
  }

  use(pathname: string, block: typeof Component) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this._currentRoute?.leave();
      const notFoundRoute = this.getRoute('/404');
      if (notFoundRoute) {
        this._currentRoute = notFoundRoute;
        notFoundRoute.render();
      } else {
        console.error('Маршрут для страницы 404 не найден!');
      }
      return;
    }

    if (this._currentRoute && !isEqual(this._currentRoute._pathname, pathname)) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
