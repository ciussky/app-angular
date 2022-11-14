module.exports = (sequelize, DataType) => {
  const model = sequelize.define('Cars', {
    make: {
      type: DataType.TEXT
    }
  }, {
    timestamps: false
  });

      model.belongsTo(sequelize.models.Persons, {foreignKey: 'id', as: 'car_id'});
      sequelize.models.Persons.hasMany(sequelize.models.Cars, {foreignKey: 'car_id'});

  return model;
};
