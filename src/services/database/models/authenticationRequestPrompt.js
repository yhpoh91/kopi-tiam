module.exports = (sequelize, DataTypes) => {
  const AuthenticationRequestPrompt = sequelize.define('AuthenticationRequestPrompt', {
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

  AuthenticationRequestPrompt.associate = (models) => {
    // associations can be defined here
    AuthenticationRequestPrompt.belongsTo(models.AuthenticationRequest, { foreignKey: 'authenticationRequestId', as: 'authenticationRequest' });
  };

  return AuthenticationRequestPrompt;
};