const request = require('supertest');
const express = require('express');
const path = require('path');
const blogRouter = require('../../routes/blog'); 

const app = express();

// Set up the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../../views'));

// Middleware to parse body
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/', blogRouter);

describe('Blog Routes Integration Tests', () => {
  test('GET / - should render the login page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('login');
  });

  test('GET /signup - should render the signup page', async () => {
    const response = await request(app).get('/signup');
    expect(response.status).toBe(200);
    expect(response.text).toContain('signup');
  });

  test('POST /signup - should handle signup', async () => {
    const response = await request(app)
      .post('/signup')
      .send('username=newuser&password=newpassword1');
    expect(response.status).toBe(200); 
  });

  test('POST /login - should handle login', async () => {
    const response = await request(app)
      .post('/login')
      .send('username=newuser&password=newpassword1');
    expect(response.status).toBe(200); 
  });

});
