module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define("user_bettings", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bet_layout: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    bet_unit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bet_win: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bet_lost: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bet_spin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number_win: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bet_tx_hash: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    bet_success: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    underscored: true,
    timestamps: true,
  });
  Model.associate = (models) => {
    Model.belongsTo(models.users, {
      as: 'User',
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };
  return Model;
};