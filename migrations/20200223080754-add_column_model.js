'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'models',
        'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'comments',
        'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      )
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('models', 'updatedAt'),

      queryInterface.removeColumn('comments', 'updatedAt')
    ]);
  }
};
