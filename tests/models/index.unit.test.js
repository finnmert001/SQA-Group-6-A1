const { Sequelize, DataTypes } = require('sequelize');
const { BlogPost } = require('../../models/index');

describe('BlogPost Model Unit Tests', () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize('sqlite::memory:'); // Use in-memory database for testing
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // it('should create a BlogPost with valid attributes', async () => {
  //   const blogPost = await BlogPost.create({
  //     title: 'Test Title',
  //     topic: 'Test Topic',
  //     content: 'Test Content',
  //     author: 'Test Author',
  //   });

  //   expect(blogPost.title).toBe('Test Title');
  //   expect(blogPost.topic).toBe('Test Topic');
  //   expect(blogPost.content).toBe('Test Content');
  //   expect(blogPost.author).toBe('Test Author');
  // });

  it('should not create a BlogPost with missing title', async () => {
    await expect(
      BlogPost.create({
        topic: 'Test Topic',
        content: 'Test Content',
        author: 'Test Author',
      })
    ).rejects.toThrow();
  });

  // it('should use default value for topic if not provided', async () => {
  //   const blogPost = await BlogPost.create({
  //     title: 'Test Title',
  //     content: 'Test Content',
  //     author: 'Test Author',
  //   });

  //   expect(blogPost.topic).toBe('General');
  // });
});