'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'subscribers',
        'resetToken',
        {
          type: Sequelize.TEXT
        }
      ),
      queryInterface.addColumn(
        'subscribers',
        'resetTokenExp',
        {
          type: Sequelize.DATE
        }
      ),
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('subscribers', 'fileName'),
      queryInterface.removeColumn('subscribers', 'fileName'),
    ]);
  }
};
