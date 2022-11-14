module.exports = (sequelize, DataType) => {
  let model = sequelize.define('Information', {
    name: {
      type: DataType.TEXT
    },
    type: {
      type: DataType.INTEGER
    },
    liked: {
      type: DataType.BOOLEAN
    }
  }, {
    timestamps: false
  });
  return model;
};
