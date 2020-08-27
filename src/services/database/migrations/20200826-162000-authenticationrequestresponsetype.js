module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuthenticationRequestResponseTypeTable = () => queryInterface.createTable('AuthenticationRequestResponseTypes', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      authenticationRequestId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      value: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
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
      .then(createAuthenticationRequestResponseTypeTable);
  },
  down: (queryInterface) => {
    const dropAuthenticationRequestResponseTypeTable = () => queryInterface.dropTable('AuthenticationRequestResponseTypes');
    return Promise.resolve()
      .then(dropAuthenticationRequestResponseTypeTable);
  },
};