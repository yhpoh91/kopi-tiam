module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define('Email', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    emailType: {
      type: DataTypes.STRING(500),
      allowNull: false,
      default: 'work',
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    preferred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
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

  Email.associate = (models) => {
    // associations can be defined here
    Email.belongsTo(models.Profile, { foreignKey: 'profileId', as: 'profile' });
  };

  return Email;
};