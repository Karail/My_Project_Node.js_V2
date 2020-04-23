'use strict';
module.exports = (sequelize, DataTypes) => {
  const DislikeSubscriber = sequelize.define('dislike_subscribers', {
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
    subscriber_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'subscribers',
        key: 'id',
        as: 'subscriber_id'
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
  DislikeSubscriber.associate = function(models) {
    // associations can be defined here
  };
  return DislikeSubscriber;
}