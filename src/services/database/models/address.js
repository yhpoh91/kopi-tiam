module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    streetAddress: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    locality: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(3000),
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

  Address.associate = (models) => {
    // associations can be defined here
    Address.belongsTo(models.Profile, { foreignKey: 'profileId' });
  };

  return Address;
};