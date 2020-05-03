'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('comments', 'updatedAt')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'comments',
        'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
    ]);
  }
};
