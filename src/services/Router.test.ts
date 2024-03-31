import { expect } from 'chai';
import { createSandbox, spy } from 'sinon';
import Router from './Router.ts';
import Component from './Component.ts';

describe('Router', () => {
  const sandBox = createSandbox();
  let MockRouter: Router;

  class TestComponent extends Component {
    constructor() {
      super('div', {});
    }

    render() {
      return this.compile('<div>Test<div>', {});
    }
  }

  beforeEach(() => {
    MockRouter = new Router('.app');
  });

  afterEach(() => {
    sandBox.restore();
  });

  describe('Router object', () => {
    it('should not be null', () => {
      expect(MockRouter).not.null;
    });
  });

  describe('Router methods', () => {
    it('should return correct route when using getRoute method', () => {
      MockRouter.use('/test', TestComponent);
      const route = MockRouter.getRoute('/test');
      expect(route).to.not.be.undefined;
      if (route) {
        expect(route._pathname).to.be.equal('/test');
      }
    });

    it('should change URL and trigger pushState when using go method', () => {
      const pushStateSpy = spy(window.history, 'pushState');
      MockRouter.use('/', TestComponent);
      MockRouter.use('/test', TestComponent);
      MockRouter.go('/test');
      expect(pushStateSpy.calledOnce).to.be.true;
      expect(window.location.pathname).to.be.equal('/test');
      pushStateSpy.restore();
    });

    it('should trigger history back when using back method', () => {
      const pushStateSpy = spy(window.history, 'back');
      MockRouter.use('/', TestComponent);
      MockRouter.use('/test', TestComponent);
      MockRouter.go('/test');
      MockRouter.back();
      expect(pushStateSpy.calledOnce).to.be.true;
      pushStateSpy.restore();
    });

    it('should trigger history forward when using forward method', () => {
      const pushStateSpy = spy(window.history, 'forward');
      MockRouter.use('/', TestComponent);
      MockRouter.use('/test', TestComponent);
      MockRouter.go('/test');
      MockRouter.back();
      MockRouter.forward();
      expect(pushStateSpy.calledOnce).to.be.true;
      pushStateSpy.restore();
    });
  });
  describe('Router navigation', () => {
    it('should trigger multiple pushState calls when navigating through multiple routes', () => {
      const pushStateSpy = spy(window.history, 'pushState');
      MockRouter.use('/', TestComponent);
      MockRouter.use('/test', TestComponent);
      MockRouter.use('/another', TestComponent);
      MockRouter.go('/test');
      MockRouter.go('/another');
      MockRouter.go('/');
      expect(pushStateSpy.callCount).to.be.equal(3);
      expect(window.location.pathname).to.be.equal('/');
      pushStateSpy.restore();
    });
  });
});
