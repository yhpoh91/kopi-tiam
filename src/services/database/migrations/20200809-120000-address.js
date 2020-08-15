module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAddressesTable = () => queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      streetAddress: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      locality: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      region: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      postalCode: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
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
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
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
      .then(createAddressesTable);
  },
  down: (queryInterface) => {
    const dropAddressesTable = () => queryInterface.dropTable('Addresses');
    return Promise.resolve()
      .then(dropAddressesTable);
  },
};