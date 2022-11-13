const models = require(".");

module.exports = (sequelize, DataType) => {
  const model = sequelize.define('Cars', {
    make: {
      type: DataType.TEXT
    }
  }, {
    timestamps: false
  });
  
  // model.belongsTo(sequelize.models.Persons, {foreignKey: 'id_car', onDelete: 'set null'});

    // model.belongsTo(sequelize.models.Persons, {foreignKey: '', onDelete: 'set null'});

    // sequelize.models.associate = (models) => {
    //   models.Cars.belongsTo(sequelize.models., {foreignKey: 'ID'});
    // };    
    // sequelize.models.Cars.belongsTo(sequelize.models.Persons, {foreignKey: 'id_car', onDelete: 'set null'});
    // sequelize.models.Persons.hasMany(sequelize.models.Cars, {foreignKey: 'id_car', onDelete: 'set null'});

  
      // model.belongsTo(sequelize.models.Persons, {foreignKey: 'ID', as: 'makeid'});

 
  return model;
};
