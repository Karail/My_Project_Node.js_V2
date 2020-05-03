'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tags', {
    name: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Tag.associate = function (models) {
    // associations can be defined here
  };
  return Tag;
};