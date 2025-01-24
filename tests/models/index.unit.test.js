const { Sequelize, DataTypes } = require("sequelize");
const { BlogPost } = require("../../models/index");

describe("BlogPost Model Unit Tests", () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize("sqlite::memory:"); // Use in-memory database for testing
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should not create a BlogPost with missing title", async () => {
    await expect(
      BlogPost.create({
        topic: "Test Topic",
        content: "Test Content",
        author: "Test Author",
      })
    ).rejects.toThrow();
  });
});
