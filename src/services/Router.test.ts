import { expect } from 'chai';
import Router from './Router';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('.app');
  });

  describe('Router object', () => {
    it('is not null', () => {
      expect(router).not.null;
    });
  });
});
