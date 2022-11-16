module.exports = (sequelize) => {
  const model = sequelize.define(
    "Junction",
    {},
    { timestamps: false }
  );

  sequelize.models.Persons.belongsToMany(sequelize.models.Cars, {through:model, foreignKey: 'id_person', onDelete: 'set null' });
  sequelize.models.Cars.belongsToMany(sequelize.models.Persons, {through:model, foreignKey: 'id_car', onDelete: 'set null' });
  
  return model;
};
