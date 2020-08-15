module.exports = {
  up: (queryInterface, Sequelize) => {
    const createProfilesTable = () => queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      givenName: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      familyName: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      middleName: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      preferredUsername: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      profile: {
        type: Sequelize.STRING(3000),
        allowNull: true,
      },
      picture: {
        type: Sequelize.STRING(3000),
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING(3000),
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nationality: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      zoneInfo: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
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
      .then(createProfilesTable);
  },
  down: (queryInterface) => {
    const dropProfilesTable = () => queryInterface.dropTable('Profiles');
    return Promise.resolve()
      .then(dropProfilesTable);
  },
};