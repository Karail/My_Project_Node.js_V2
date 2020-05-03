'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('video_categories', {
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
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
          as: 'category_id'
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
    return queryInterface.dropTable('video_categories')
  }
}