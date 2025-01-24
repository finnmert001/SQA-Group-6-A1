const { sequelize, BlogPost } = require('../../models/index');

describe('BlogPost Model Integration Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create and retrieve a BlogPost from the database', async () => {
    const blogPostData = {
      title: 'Integration Test Title',
      topic: 'Integration Test Topic',
      content: 'Integration Test Content',
      author: 'Integration Test Author',
    };

    const createdBlogPost = await BlogPost.create(blogPostData);
    const retrievedBlogPost = await BlogPost.findByPk(createdBlogPost.id);

    expect(retrievedBlogPost.title).toBe(blogPostData.title);
    expect(retrievedBlogPost.topic).toBe(blogPostData.topic);
    expect(retrievedBlogPost.content).toBe(blogPostData.content);
    expect(retrievedBlogPost.author).toBe(blogPostData.author);
  });
});