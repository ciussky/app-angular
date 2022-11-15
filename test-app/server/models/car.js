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

  return model;
};


