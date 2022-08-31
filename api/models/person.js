'use strict';
module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    person_name: DataTypes.STRING,
    points: DataTypes.INTEGER,
    indication_code: DataTypes.STRING,
  }, {});
  Person.associate = function (models) {
    Person.hasMany(models.Purchase, {
      foreignKey: 'person_id'
    });
  };
  return Person;
};