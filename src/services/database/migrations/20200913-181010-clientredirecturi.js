module.exports = {
  up: (queryInterface, Sequelize) => {
    const createClientRedirectUriTable = () => queryInterface.createTable('ClientRedirectUris', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      uri: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      clientId: {
        type: Sequelize.STRING(45),
        allowNull: false,
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
      .then(createClientRedirectUriTable);
  },
  down: (queryInterface) => {
    const dropClientRedirectUriTable = () => queryInterface.dropTable('ClientRedirectUris');
    return Promise.resolve()
      .then(dropClientRedirectUriTable);
  },
};