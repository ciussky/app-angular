
module.exports = (sequelize, DataType) => {
  const model = sequelize.define('Persons', {
    fname: {
      type: DataType.TEXT
    }
  }, {
    timestamps: false
  });
  /*
    Aceasta linie este comentata pentru a demonstra legatura dintre tabelul Information si tabelul Post prin id
  */

    // model.hasMany(sequelize.mo, {foreignKey: 'id_car', onDelete: 'set null'});
    // sequelize.models.associate = (models) => {
    //   model.belongsTo(models., {foreignKey: 'ID'});
    // };    
  return model;
};
