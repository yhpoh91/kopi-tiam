module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuthenticationRequestClaimsLocaleTable = () => queryInterface.createTable('AuthenticationRequestClaimsLocales', {
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
      .then(createAuthenticationRequestClaimsLocaleTable);
  },
  down: (queryInterface) => {
    const dropAuthenticationRequestClaimsLocaleTable = () => queryInterface.dropTable('AuthenticationRequestClaimsLocales');
    return Promise.resolve()
      .then(dropAuthenticationRequestClaimsLocaleTable);
  },
};