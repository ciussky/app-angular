module.exports = (sequelize) => {
  const model = sequelize.define(
    "Junctions",
    {},
    { timestamps: false },
  );

  sequelize.models.Persons.belongsToMany(sequelize.models.Cars, {as: 'cars', through:model, foreignKey: 'id_person', onDelete: 'cascade' });
  sequelize.models.Cars.belongsToMany(sequelize.models.Persons, {as: 'persons', through:model, foreignKey: 'id_car', onDelete: 'cascade' });
  return model;
};
