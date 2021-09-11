module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("spins", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: true,
  });
  return Model;
};