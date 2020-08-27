module.exports = (sequelize, DataTypes) => {
  const AuthenticationRequest = sequelize.define('AuthenticationRequest', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    redirectUri: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    responseMode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nonce: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    display: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    maxAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idTokenHint: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    loginHint: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    authTime: {
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

  AuthenticationRequest.associate = (models) => {
    // associations can be defined here
    AuthenticationRequest.hasMany(models.AuthenticationRequestScope, { foreignKey: 'authenticationRequestId', as: 'scopes' });
    AuthenticationRequest.hasMany(models.AuthenticationRequestResponseType, { foreignKey: 'authenticationRequestId', as: 'responseTypes' });
    AuthenticationRequest.hasMany(models.AuthenticationRequestPrompt, { foreignKey: 'authenticationRequestId', as: 'prompts' });
    AuthenticationRequest.hasMany(models.AuthenticationRequestAcrValue, { foreignKey: 'authenticationRequestId', as: 'acrValues' });
    AuthenticationRequest.hasMany(models.AuthenticationRequestClaimsLocale, { foreignKey: 'authenticationRequestId', as: 'claimsLocales' });
    AuthenticationRequest.hasMany(models.AuthenticationRequestUiLocale, { foreignKey: 'authenticationRequestId', as: 'uiLocales' });
  };

  return AuthenticationRequest;
};