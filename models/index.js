const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BlogPost = sequelize.define(
  "BlogPost",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      index: true,
    },
    topic: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "General",
      index: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
      index: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    indexes: [
      {
        fields: ["title"],
      },
      {
        fields: ["topic"],
      },
      {
        fields: ["author"],
      },
    ],
  }
);

module.exports = { sequelize, BlogPost };
