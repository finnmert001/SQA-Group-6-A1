const request = require('supertest');
const express = require('express');
const path = require('path');
const blogRoutes = require('../routes/blog');

const app = express();
let currentUser;

// View engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/", blogRoutes);

describe('App Integration Tests', () => {
  it('should serve static files from the public directory', async () => {
    const response = await request(app).get('/css/style.css');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/css');
  });

  it('should render the login page on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('login'); // Adjust based on your template content
  });

  it('should handle form submissions', async () => {
    const response = await request(app)
      .post('/login')
      .send('username=testuser&password=testpassword');
    expect(response.status).toBe(200); // Adjust based on your route handling
  });

  // Add more tests for other routes and middleware as needed
});