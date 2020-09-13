module.exports = (sequelize, DataTypes) => {
  const ClientRedirectUri = sequelize.define('ClientRedirectUri', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    uri: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    clientId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    }
  }, {
    timestamps: true,
  });

  ClientRedirectUri.associate = (models) => {
    // associations can be defined here
  };

  return ClientRedirectUri;
};