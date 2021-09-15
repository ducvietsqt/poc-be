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
    },
    secret: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_tx_hash: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    end_tx_hash: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    underscored: true,
    timestamps: true,
  });
  return Model;
};