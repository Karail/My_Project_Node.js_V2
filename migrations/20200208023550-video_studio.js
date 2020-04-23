'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('video_studios', {
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
      studio_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'studios',
          key: 'id',
          as: 'studio_id'
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
    return queryInterface.dropTable('video_studios')
  }
}