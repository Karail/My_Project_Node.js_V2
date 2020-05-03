'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('videos', 'descr')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'videos',
        'descr',
        {
          allowNull: false,
          type: Sequelize.TEXT
        }
      ),
    ]);
  }
};
