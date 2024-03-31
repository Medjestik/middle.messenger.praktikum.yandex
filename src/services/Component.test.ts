import { expect } from 'chai';
import { createSandbox } from 'sinon';
import Component from './Component.ts';

describe('Component', () => {
  const sandBox = createSandbox();
  let MockComponent: Component;
  const testProps = { text: 'Test' };

  class TestComponent extends Component {
    constructor() {
      super('div', testProps);
    }

    render() {
      return this.compile('<p>{{text}}</p>', testProps);
    }
  }

  beforeEach(() => {
    MockComponent = new TestComponent();
  });

  afterEach(() => {
    sandBox.restore();
  });

  describe('Component object', () => {
    it('should not be null', () => {
      expect(MockComponent.getContent()).not.null;
    });
  });

  describe('Component props', () => {
    it('should render element with props', () => {
      expect(MockComponent.element?.innerHTML).to.be.equal('<p>Test</p>');
    });

    it('should change props', () => {
      const text = 'text was changed';
      MockComponent.setProps({ text });
      expect(MockComponent.element?.innerHTML).to.be.equal('<p>text was changed</p>');
    });
  });

  describe('Component methods', () => {
    it('should display element when using show method', () => {
      MockComponent.getContent()!.style.display = 'none';
      MockComponent.show();
      expect(MockComponent.getContent()!.style.display).to.be.equal('block');
    });

    it('should hide element when using hide method', () => {
      MockComponent.getContent()!.style.display = 'block';
      MockComponent.hide();
      expect(MockComponent.getContent()!.style.display).to.be.equal('none');
    });

    it('should remove element from DOM when using remove method', () => {
      const contentElement = document.createElement('div');
      document.body.appendChild(contentElement);
      MockComponent.getContent = () => contentElement;
      MockComponent.remove();
      expect(document.body.contains(contentElement)).to.be.false;
    });
  });
});
