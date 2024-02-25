import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './EventBus.ts';

export type Props = Record<string, any>;

interface IMeta {
  tagName: string;
  props: Props;
}

class Component {
  private _element: HTMLElement | null = null;

  private _meta: IMeta | null = null;

  public props: Props;

  public children: Props;

  public lists: Props;

  private _id: string;

  private eventBus: () => EventBus;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(tagName: string = 'div', propsAndChildren = {}) {
    const { children, props, lists } = this._getChildren(propsAndChildren);

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._id = makeUUID();

    this.children = this._makePropsProxy(children);
    this.lists = this._makePropsProxy(lists);
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this._meta = { tagName, props };

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  private _render() {
    const block: unknown = this.render();

    if (block instanceof Node) {
      this._removeEvents();
      if (this._element) {
        this._element.innerHTML = '';
        this._element.appendChild(block);
      }
      this._addEvents();
      this._addAttribute();
    }
  }

  render() {}

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  private _addAttribute() {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (typeof value === 'string') {
        this._element?.setAttribute(key, value);
      }
    });
  }

  private _getChildren(propsAndChildren : Props) {
    const children: { [key: string]: unknown } = {};
    const props: { [key: string]: unknown } = {};
    const lists: { [key: string]: any } = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props, lists };
  }

  compile(template: string, props: Props) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-uuid="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-uuid="__l_${key}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    const hbsTemplate = Handlebars.compile(template);
    fragment.innerHTML = hbsTemplate(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-uuid="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const stub = fragment.content.querySelector(`[data-uuid="__l_${key}"]`);

      if (stub) {
        const listContent: HTMLTemplateElement = this._createDocumentElement('template');

        child.forEach((item: unknown) => {
          if (item instanceof Component) {
            const content = item.getContent();
            if (content) {
              listContent.content.append(content);
            }
          } else {
            listContent.content.append(`${item}`);
          }
        });
        stub.replaceWith(listContent.content);
      }
    });

    return fragment.content;
  }

  private _createResources() {
    if (this._meta) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    } else {
      throw new Error('Ошибка при создании ресурса');
    }
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: unknown, newProps: unknown) {
    return oldProps !== newProps;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      set(target: Props, prop: string, value: unknown) {
        const oldProps = { ...target };
        target[prop] = value;

        self.eventBus().emit(Component.EVENTS.FLOW_CDU, oldProps, { ...target });
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) : HTMLTemplateElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-uuid', this._id);
    return element as HTMLTemplateElement;
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}

export default Component;
