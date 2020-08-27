module.exports = (sequelize, DataTypes) => {
  const AuthenticationRequestUiLocale = sequelize.define('AuthenticationRequestUiLocale', {
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

  AuthenticationRequestUiLocale.associate = (models) => {
    // associations can be defined here
    AuthenticationRequestUiLocale.belongsTo(models.AuthenticationRequest, { foreignKey: 'authenticationRequestId', as: 'authenticationRequest' });
  };

  return AuthenticationRequestUiLocale;
};