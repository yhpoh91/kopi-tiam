module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuthorizationTable = () => queryInterface.createTable('Authorizations', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING(1000),
        allowNull: false,
        unique: true,
      },
      authorizationRequestId: {
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
      .then(createAuthorizationTable);
  },
  down: (queryInterface) => {
    const dropAuthorizationTable = () => queryInterface.dropTable('Authorizations');
    return Promise.resolve()
      .then(dropAuthorizationTable);
  },
};