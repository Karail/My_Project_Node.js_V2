'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'videos',
        'fileName',
        {
          allowNull: false,
          type: Sequelize.TEXT
        }
      ),
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('videos', 'fileName'),
    ]);
  }
};
