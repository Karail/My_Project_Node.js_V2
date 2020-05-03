'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('videos', 'img')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'videos',
        'img',
        {
          allowNull: false,
          type: Sequelize.TEXT
        }
      ),
    ]);
  }
};
