'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Purchase', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      indication_code: {
        allowNull: true,
        type: Sequelize.STRING
      }
    }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Purchase');
  }
};
