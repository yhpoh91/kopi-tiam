module.exports = (sequelize, DataTypes) => {
  const AuthenticationRequestClaimsLocale = sequelize.define('AuthenticationRequestClaimsLocale', {
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

  AuthenticationRequestClaimsLocale.associate = (models) => {
    // associations can be defined here
    AuthenticationRequestClaimsLocale.belongsTo(models.AuthenticationRequest, { foreignKey: 'authenticationRequestId', as: 'authenticationRequest' });
  };

  return AuthenticationRequestClaimsLocale;
};