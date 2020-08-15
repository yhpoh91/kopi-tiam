module.exports = {
  up: (queryInterface, Sequelize) => {
    const createLocalUsersTable = () => queryInterface.createTable('LocalUsers', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
      },
      passwordHash: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      passwordSalt: {
        type: Sequelize.STRING(1000),
        allowNull: false,
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
      .then(createLocalUsersTable);
  },
  down: (queryInterface) => {
    const dropLocalUsersTable = () => queryInterface.dropTable('LocalUsers');
    return Promise.resolve()
      .then(dropLocalUsersTable);
  },
};