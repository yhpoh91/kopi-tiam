module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuthorizationRequestTable = () => queryInterface.createTable('AuthorizationRequests', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      sub: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      authenticationRequestId: {
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
      .then(createAuthorizationRequestTable);
  },
  down: (queryInterface) => {
    const dropAuthorizationRequestTable = () => queryInterface.dropTable('AuthorizationRequests');
    return Promise.resolve()
      .then(dropAuthorizationRequestTable);
  },
};