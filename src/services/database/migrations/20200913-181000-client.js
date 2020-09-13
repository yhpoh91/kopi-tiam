module.exports = {
  up: (queryInterface, Sequelize) => {
    const createClientTable = () => queryInterface.createTable('Clients', {
      id: {
        type: Sequelize.STRING(100),
        allowNull: false,
        primaryKey: true,
      },
      secretHash: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      secretSalt: {
        type: Sequelize.STRING(1000),
      },
      name: {
        type: Sequelize.STRING(500),
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
      .then(createClientTable);
  },
  down: (queryInterface) => {
    const dropClientTable = () => queryInterface.dropTable('Clients');
    return Promise.resolve()
      .then(dropClientTable);
  },
};