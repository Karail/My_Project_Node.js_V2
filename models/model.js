'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    name: DataTypes.STRING,
    img: DataTypes.TEXT,
    createdAt:{
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Model.associate = function(models) {
    // associations can be defined here
  };
  return Model;
};