module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuthenticationRequestTable = () => queryInterface.createTable('AuthenticationRequests', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      clientId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      redirectUri: {
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      responseMode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nonce: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      display: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      maxAge: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      idTokenHint: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      loginHint: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      authTime: {
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
      .then(createAuthenticationRequestTable);
  },
  down: (queryInterface) => {
    const dropAuthenticationRequestTable = () => queryInterface.dropTable('AuthenticationRequests');
    return Promise.resolve()
      .then(dropAuthenticationRequestTable);
  },
};