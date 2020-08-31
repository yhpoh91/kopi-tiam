module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuthorizationConsentTable = () => queryInterface.createTable('AuthorizationConsents', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      sub: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      clientId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      scope: {
        type: Sequelize.STRING(1000),
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
      .then(createAuthorizationConsentTable);
  },
  down: (queryInterface) => {
    const dropAuthorizationConsentTable = () => queryInterface.dropTable('AuthorizationConsents');
    return Promise.resolve()
      .then(dropAuthorizationConsentTable);
  },
};