module.exports = (sequelize, DataType) => {
  let model = sequelize.define('Persons', {
    fname: {
      type: DataType.TEXT,
      allowNull: true
    },
    lname: {
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

  // sequelize.sync({ logging: console.log, where: { id: 1 } });

  return model;
};
