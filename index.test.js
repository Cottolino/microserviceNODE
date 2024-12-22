const request = require('supertest');
const app = require('./index');

//expect(response.body).toEqual(expect.arrayContaining([expect.any(String)])

describe('Login API', () => {
    it('POST /login --> Send token', () => {
        return request(app)
            .post('/login').send({
                username: 'Username',
                password: 'Password'
            }).expect('Content-Type', /json/).then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String),
                        username: 'Username',
                        id: expect.any(String)
                    })
                );
            });
        
    });

    it('POST /login --> No User Found', () => {
        return request(app)
        .post('/login').send({
            username: 'Username99',
            password: 'Password'
        }).expect('Content-Type', /json/).then(response => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    message: 'No User Found'
                })
            );
        });
    });

    it('POST /register --> Register OK', () => {
        return request(app)
            .post('/register').send({
                username: 'Username41',
                password: 'Password'
            }).expect('Content-Type', /json/).then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: 'User registered successfully'
                    })
                );
            });
    });

    it('POST /register --> User already exists', () => {
        return request(app)
            .post('/register').send({
                username: 'Username',
                password: 'Password'
            }).expect('Content-Type', /json/).then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: 'User already exists'
                    })
                );
            });
    });
});