module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true,
    },
    secretHash: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    secretSalt: {
      type: DataTypes.STRING(1000),
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    }
  }, {
    timestamps: true,
  });

  Client.associate = (models) => {
    // associations can be defined here
  };

  return Client;
};