'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('videos', 'like'),
      queryInterface.removeColumn('videos', 'dislike'),
      queryInterface.removeColumn('videos', 'views'),
    ]);
  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.addColumn(
        'videos',
        'like',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'videos',
        'dislike',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'videos',
        'views',
        {
          type: Sequelize.INTEGER
        }
      ),
    ]);
  }
};
