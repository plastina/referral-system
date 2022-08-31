'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Person', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      person_name: {
        type: Sequelize.STRING
      },
      points: {
        type: Sequelize.INTEGER,
      },
      indication_code: {
        allowNull: true,
        type: Sequelize.STRING
      },
    },
    {
      timestamps: false,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Person');
  }
};
