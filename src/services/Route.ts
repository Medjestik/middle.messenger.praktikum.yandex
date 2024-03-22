import RenderDOM from './RenderDOM';
import Component from './Component';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  public _pathname: string;

  private _blockClass: typeof Component;

  private _block: Component | null;

  private _props: Record<string, any>;

  constructor(pathname: string, view: typeof Component, props: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.remove();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    if (this._block) {
      RenderDOM(this._props.rootQuery, this._block);
    }
  }
}

export default Route;
