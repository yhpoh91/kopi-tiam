module.exports = (sequelize, DataTypes) => {
  const AuthenticationRequestResponseType = sequelize.define('AuthenticationRequestResponseType', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    authenticationRequestId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
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

  AuthenticationRequestResponseType.associate = (models) => {
    // associations can be defined here
    AuthenticationRequestResponseType.belongsTo(models.AuthenticationRequest, { foreignKey: 'authenticationRequestId', as: 'authenticationRequest' });
  };

  return AuthenticationRequestResponseType;
};