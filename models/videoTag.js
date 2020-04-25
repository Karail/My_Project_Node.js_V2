'use strict';
module.exports = (sequelize, DataTypes) => {
  const VideoTag = sequelize.define('video_tags', {
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
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tags',
        key: 'id',
        as: 'tag_id'
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
  VideoTag.associate = function (models) {
    // associations can be defined here
  };
  return VideoTag;
};