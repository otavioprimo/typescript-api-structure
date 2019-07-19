

import * as should from 'should';
import * as request from 'supertest';

import app from '../app';

describe('User', () => {
    describe('Login', () => {
        it('Should success and return token and refresh token', (done) => {
            request(app)
                .post('/v1/login')
                .send({ email: "otavioprimo@gmail.com", password: "123456" })
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => {
                    let body = res.body;
                    should(body).have.property('error', false);
                    should(body).have.property('token');
                    should(body).have.property('refreshToken');
                    done();
                });
        });
        it('Should error and return invalid credentials', (done) => {
            request(app)
                .post('/v1/login')
                .send({ email: "otavioprimo@gmail.com", password: "654321" })
                .expect('Content-Type', /json/)
                .expect(401)
                .then(res => {
                    let body = res.body;
                     should(body).have.property('error', true);
                     should(body).have.property('message', 'Invalid Credentials');
                    done();
                });
        });
    });
});
