module.exports = (sequelize, DataTypes) => {
  const AuthorizationConsent = sequelize.define('AuthorizationConsent', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    sub: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    clientId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING(1000),
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

  AuthorizationConsent.associate = (models) => {
    // associations can be defined here
  };

  return AuthorizationConsent;
};