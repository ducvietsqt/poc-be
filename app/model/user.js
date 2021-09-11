module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    private_key: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    underscored: true,
    timestamps: true,
  });
  return User;
};