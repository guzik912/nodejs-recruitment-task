const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const isAuthMiddleware = require('../src/middlewares/isAuth');
const jwt = require('jsonwebtoken');

describe('Auth middleware', () => {
  it('Should return status 401 if no token providen', (done) => {
    const req = {
      header: (headerName) => {
        return null;
      }
    };

    const res = isAuthMiddleware.bind(this, req, {}, () => {});
    done();
    expect(res.status).to.equal(401);
  });

  it('Should return user data if authenticated completed', () => {
    const req = {
      header: (headerName) => {
        return "Bearer xyz";
      }
    };

    sinon.stub(jwt, 'verify');
    jwt.verify.returns({userId: 'xyz'})

    isAuthMiddleware(req, {}, () => {});
    expect(req).to.have.property('user');
    expect(req).to.have.property('user', {userId: 'xyz'});
    jwt.verify.restore();
  });
})