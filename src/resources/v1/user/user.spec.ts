
import * as chai from 'chai';
import { should } from 'chai';
import chaiHttp = require('chai-http');

const server = 'http://localhost:3000';

should();

chai.use(chaiHttp);

describe('User', () => {
  describe('Login', () => {
    it('Should success and return token and refresh token', (done) => {
      chai.request(server)
        .post('/v1/user/login')
        .send({ email: "otavioprimo@gmail.com", password: "123456" })
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('error', false);
          res.body.should.have.property('token');
          res.body.should.have.property('refreshToken');
          done();
        });
    });
    it('Should error and return invalid credentials', (done) => {
      chai.request(server)
        .post('/v1/user/login')
        .send({ email: "otavioprimo@gmail.com", password: "654321" })
        .then(res => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.have.property('error', true);
          res.body.should.have.property('message', 'Invalid Credentials');
          done();
        });
    });
  });
});
