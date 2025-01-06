const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BlogPost = sequelize.define(
  "BlogPost",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "General",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

module.exports = { sequelize, BlogPost };
