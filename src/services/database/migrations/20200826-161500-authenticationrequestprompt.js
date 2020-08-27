module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuthenticationRequestPromptTable = () => queryInterface.createTable('AuthenticationRequestPrompts', {
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
      .then(createAuthenticationRequestPromptTable);
  },
  down: (queryInterface) => {
    const dropAuthenticationRequestPromptTable = () => queryInterface.dropTable('AuthenticationRequestPrompts');
    return Promise.resolve()
      .then(dropAuthenticationRequestPromptTable);
  },
};