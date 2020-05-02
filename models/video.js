'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    name: DataTypes.STRING,
    url: DataTypes.TEXT,
    fileName: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislike: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    preview: DataTypes.TEXT,
    private: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    indexes: [ 
      {
        name: 'name',
        method: 'FULLTEXT',
        fields: [ 'name' ]
      },
    ]
  });
  Video.associate = function (models) {
    // associations can be defined here
  };
  return Video;
};
