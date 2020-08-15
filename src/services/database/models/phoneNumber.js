module.exports = (sequelize, DataTypes) => {
  const PhoneNumber = sequelize.define('PhoneNumber', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    phoneNumberType: {
      type: DataTypes.STRING(500),
      allowNull: false,
      default: 'work',
    },
    phoneNumber: {
      type: DataTypes.STRING(50),
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

  PhoneNumber.associate = (models) => {
    // associations can be defined here
    PhoneNumber.belongsTo(models.Profile, { foreignKey: 'profileId' });
  };

  return PhoneNumber;
};