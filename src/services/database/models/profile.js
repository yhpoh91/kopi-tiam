module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    givenName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    familyName: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    preferredUsername: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    profile: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    zoneInfo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
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

  Profile.associate = (models) => {
    // associations can be defined here
    Profile.hasMany(models.LocalUser, { foreignKey: 'profileId' });

    Profile.hasMany(models.Email, { foreignKey: 'profileId' });
    Profile.hasMany(models.PhoneNumber, { foreignKey: 'profileId' });
    Profile.hasMany(models.Address, { foreignKey: 'profileId' });
  };

  return Profile;
};