import { expect } from 'chai';
import { createSandbox, SinonStub } from 'sinon';
import HTTPTransport from './HTTPTransport.ts';

describe('HTTPTransport', () => {
  const sandBox = createSandbox();
  let http: HTTPTransport;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTPTransport('/test');
    request = sandBox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve<unknown>({ status: 200, data: 'data' }));
  });

  afterEach(() => {
    sandBox.restore();
  });

  describe('HTTPTransport methods', () => {
    it('should make GET request when using get method', () => {
      http.get('/url');
      expect(request.calledOnce).to.be.true;
      expect(request.calledWithMatch('/url')).to.be.true;
    });

    it('should make PUT request when using put method', () => {
      http.put('/url');
      expect(request.calledOnce).to.be.true;
      expect(request.calledWithMatch('/url')).to.be.true;
    });

    it('should make POST request when using post method', () => {
      http.post('/url');
      expect(request.calledOnce).to.be.true;
      expect(request.calledWithMatch('/url')).to.be.true;
    });

    it('should make DELETE request when using delete method', () => {
      http.delete('/url');
      expect(request.calledOnce).to.be.true;
      expect(request.calledWithMatch('/url')).to.be.true;
    });
  });

  describe('HTTPTransport options', () => {
    it('should include headers in request', () => {
      const headers = { 'Content-Type': 'application/json' };
      http.get('/url', { headers });
      expect(request.calledOnce).to.be.true;
      expect(request.getCall(0).args[1]).to.deep.include({ headers });
    });

    it('should include timeout in request', () => {
      const timeout = 5000;
      http.get('/url', { timeout });
      expect(request.calledOnce).to.be.true;
      expect(request.getCall(0).args[1]).to.deep.include({ timeout });
    });

    it('should include withCredentials in request', () => {
      const withCredentials = false;
      http.get('/url', { withCredentials });
      expect(request.calledOnce).to.be.true;
      expect(request.getCall(0).args[1]).to.deep.include({ withCredentials });
    });

    it('should include responseType in request', () => {
      const responseType = 'text';
      http.get('/url', { responseType });
      expect(request.calledOnce).to.be.true;
      expect(request.getCall(0).args[1]).to.deep.include({ responseType });
    });
  });
});
