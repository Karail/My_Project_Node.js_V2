'use strict';
module.exports = (sequelize, DataTypes) => {
  const VideoModel = sequelize.define('video_models', {
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
    model_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'models',
        key: 'id',
        as: 'model_id'
      }
    },
    createdAt:{
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  VideoModel.associate = function(models) {
    // associations can be defined here
  };
  return VideoModel;
};
