module.exports = (sequelize, DataType) => {
  let model = sequelize.define('Persons', {
    fname: {
      type: DataType.TEXT,
      allowNull: true
    },
    cnp: {
      type: DataType.TEXT,
      allowNull: true
    },
    age: {
      type: DataType.INTEGER,
      allowNull: true
    }
  }, {
    timestamps: false
  });
  return model;
};
