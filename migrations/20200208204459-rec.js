'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recommended', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      video_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'videos',
          key: 'id',
          as: 'video_id'
        }
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt:{
      allowNull: false,
      type: Sequelize.DATE
    }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recommended')
  }
}