module.exports = (sequelize, DataType) => {
  let model = sequelize.define('Persons', {
    fname: {
      type: DataType.TEXT
    }
  }, {
    timestamps: false
  });
  /*
    Aceasta linie este comentata pentru a demonstra legatura dintre tabelul Information si tabelul Post prin id
  */
  // model.belongsTo(sequelize.models.Post, {foreignKey: 'id_post', onDelete: 'set null'});
  return model;
};
