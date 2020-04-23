'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'models',
        'createdAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'models',
        'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),

      queryInterface.addColumn(
        'studios',
        'createdAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'studios',
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
      queryInterface.removeColumn('models', 'createdAt'),
      queryInterface.removeColumn('models', 'updatedAt'),

      queryInterface.removeColumn('studios', 'createdAt'),
      queryInterface.removeColumn('studios', 'updatedAt')
    ]);
  }
};
