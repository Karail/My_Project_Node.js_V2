'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('comments', 'id')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'comments',
        'id',
        {
          allowNull: true,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        }
      ),
    ]);
  }
};
