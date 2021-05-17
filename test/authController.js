const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');

describe('Auth controller', () => {
  it('Should return token if providen data is correct', async () => {
    sinon.stub(authFactory);

    let res = await chai.request('http://localhost:3000').post('/auth').send({
      username: 'basic-thomas',
      password: 'sR-_pcoow-27-6PAwCD8',
    });

    authFactory('secret');
    expect(res.status).to.equal(200);

    authFactory.restore();
  });

  it('Should return error if no data providen', () => {
    sinon.stub(authFactory);

    let res = await chai.request('http://localhost:3000').post('/auth').send({
      username: '',
      password: '',
    });

    authFactory('secret');
    expect(res.status).to.equal(401);

    authFactory.restore();
  });
});
