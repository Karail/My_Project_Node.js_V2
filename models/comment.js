'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    id: {
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    video_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'videos',
        key: 'id',
        as: 'video_id'
      }
    },
    comment_id: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    answer: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
  };
  return Comment;
};