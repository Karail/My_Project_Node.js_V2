'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'videos',
        'like',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
      queryInterface.addColumn(
        'videos',
        'dislike',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
      queryInterface.addColumn(
        'videos',
        'views',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {


    return Promise.all([
      queryInterface.removeColumn('videos', 'like'),
      queryInterface.removeColumn('videos', 'dislike'),
      queryInterface.removeColumn('videos', 'views'),
    ]);
  }
};
