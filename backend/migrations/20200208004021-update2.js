'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'videos',
        'createdAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'videos',
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
      queryInterface.removeColumn('videos', 'createdAt'),
      queryInterface.removeColumn('videos', 'updatedAt')
    ]);
  }
};
