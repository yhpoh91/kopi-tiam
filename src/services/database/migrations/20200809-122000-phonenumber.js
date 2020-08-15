module.exports = {
  up: (queryInterface, Sequelize) => {
    const createPhoneNumbersTable = () => queryInterface.createTable('PhoneNumbers', {
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
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      profileId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      }
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return Promise.resolve()
      .then(createPhoneNumbersTable);
  },
  down: (queryInterface) => {
    const dropPhoneNumbersTable = () => queryInterface.dropTable('PhoneNumbers');
    return Promise.resolve()
      .then(dropPhoneNumbersTable);
  },
};