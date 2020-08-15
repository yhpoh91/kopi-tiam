module.exports = (sequelize, DataTypes) => {
  const LocalUser = sequelize.define('LocalUser', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    passwordSalt: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    profileId: {
      type: DataTypes.STRING(45),
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

  LocalUser.associate = (models) => {
    // associations can be defined here
    LocalUser.belongsTo(models.Profile, { foreignKey: 'profileId' });
  };

  return LocalUser;
};