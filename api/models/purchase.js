'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    product_name: DataTypes.STRING,
    indication_code: DataTypes.STRING,
  }, {});
  Purchase.associate = function (models) {
    Purchase.belongsTo(models.Person, {
      foreignKey: 'person_id'
    })
  };
  return Purchase;
};