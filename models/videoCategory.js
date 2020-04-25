'use strict';
module.exports = (sequelize, DataTypes) => {
  const VideoCategory = sequelize.define('video_categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    video_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'videos',
        key: 'id',
        as: 'video_id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
        as: 'category_id'
      }
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
  VideoCategory.associate = function (models) {
    // associations can be defined here
  };
  return VideoCategory;
};