const sequelize = require('../../config/database');

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error; // Ensure the test fails if connection is not successful
    }
  });

  afterAll(async () => {
    await sequelize.close();
  });
});