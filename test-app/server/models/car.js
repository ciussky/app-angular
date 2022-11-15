module.exports = (sequelize, DataType) => {
  const model = sequelize.define('Cars', {
    make: {
      type: DataType.TEXT,
      allowNull: true
    },
    model: {
      type: DataType.TEXT,
      allowNull: true
    },
    makeyear: {
      type: DataType.INTEGER,
      allowNull: true
    },
    ccapicity: {
      type: DataType.INTEGER,
      allowNull: true
    },
    tax: {
      type: DataType.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false
  });

      model.belongsTo(sequelize.models.Persons, {foreignKey: 'id', as: 'car_id'});
      sequelize.models.Persons.hasMany(sequelize.models.Cars, {foreignKey: 'car_id'});

  return model;
};
