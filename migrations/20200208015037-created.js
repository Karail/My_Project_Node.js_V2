'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'categories',
        'createdAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'categories',
        'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('categories', 'createdAt'),
      queryInterface.removeColumn('categories', 'updatedAt')
    ]);
  }
};