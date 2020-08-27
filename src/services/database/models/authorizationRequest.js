module.exports = (sequelize, DataTypes) => {
  const AuthorizationRequest = sequelize.define('AuthorizationRequest', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    sub: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    authenticationRequestId: {
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

  AuthorizationRequest.associate = (models) => {
    // associations can be defined here
    AuthorizationRequest.belongsTo(models.AuthenticationRequest, { foreignKey: 'authenticationRequestId', as: 'authenticationRequest' });
  };

  return AuthorizationRequest;
};