module.exports = (sequelize, DataTypes) => {
  const Authorization = sequelize.define('Authorization', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      unique: true,
    },
    authorizationRequestId: {
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

  Authorization.associate = (models) => {
    // associations can be defined here
    Authorization.belongsTo(models.AuthorizationRequest, { foreignKey: 'authorizationRequestId', as: 'authorizationRequest' });
  };

  return Authorization;
};