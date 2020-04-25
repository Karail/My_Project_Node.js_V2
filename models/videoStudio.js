'use strict';
module.exports = (sequelize, DataTypes) => {
  const VideoStudio = sequelize.define('video_studios', {
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
    studio_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'studios',
        key: 'id',
        as: 'studio_id'
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
  VideoStudio.associate = function (models) {
    // associations can be defined here
  };
  return VideoStudio;
};