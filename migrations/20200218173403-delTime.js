'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('models', 'updatedAt')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'models',
        'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
    ]);
  }
};
