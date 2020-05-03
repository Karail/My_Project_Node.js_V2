'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'videos',
        'preview',
        {
          allowNull: true,
          type: Sequelize.TEXT
        }
      ),
      queryInterface.addColumn(
        'videos',
        'previewFileName',
        {
          allowNull: true,
          type: Sequelize.TEXT
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {

  }
};
