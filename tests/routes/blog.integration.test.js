const request = require('supertest');
const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const { router: blogRouter } = require('../../routes/blog');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../../views'));
app.use(express.json());
app.use('/blog', blogRouter);

// Use an in-memory SQLite database for testing
const sequelize = new Sequelize('sqlite::memory:');
const BlogPost = sequelize.define('BlogPost', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  topic: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'General',
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Blog Routes Integration Tests', () => {
  it('should render the login page on GET /blog/login', async () => {
    const response = await request(app).get('/blog/login');
    expect(response.status).toBe(200);
    expect(response.text).toContain('login'); // Adjust based on your template content
  });

  it('should render the signup page on GET /blog/signup', async () => {
    const response = await request(app).get('/blog/signup');
    expect(response.status).toBe(200);
    expect(response.text).toContain('signup'); // Adjust based on your template content
  });

  it('should render the login page on GET /blog', async () => {
    const response = await request(app).get('/blog');
    expect(response.status).toBe(200);
    expect(response.text).toContain('login'); // Adjust based on your template content
  });

  // it('should create a new blog post on POST /blog/create', async () => {
  //   const postData = {
  //     title: 'Integration Test Title',
  //     topic: 'Integration Test Topic',
  //     content: 'Integration Test Content',
  //     author: 'Integration Test Author',
  //   };

  //   const response = await request(app)
  //     .post('/blog/create')
  //     .send(postData);

  //   expect(response.status).toBe(302); // Expect a redirect status
  //   expect(response.headers.location).toBe('/'); // Expect a redirect to the home page

  //   const createdPost = await BlogPost.findOne({ where: { title: postData.title } });
  //   expect(createdPost).not.toBeNull();
  //   expect(createdPost.title).toBe(postData.title);
  //   expect(createdPost.topic).toBe(postData.topic);
  //   expect(createdPost.content).toBe(postData.content);
  //   expect(createdPost.author).toBe(postData.author);
  // });

});