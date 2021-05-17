const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const MovieController = require('../src/controllers/movies');

describe('Movie controller', () => {
  it('Should return error if no title providen', function (done) {
    const req = {
      body: {
        title: '',
      },
    };

    MovieController.createMovie(req, {}, () => {}).then((result) => {
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 422);
      done();
    });
  });

  it('Should return error that movie already exists', () => {});

  it('If role of user is "BASIC" and count of created movies are 5, should return error that limit of created movies is used', () => {});

  it('If role of user is "PREMIUM" and count of created movies are 5, should create movie', () => {});
});
