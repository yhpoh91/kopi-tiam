module.exports = {
  up: (queryInterface, Sequelize) => {
    const createEmailsTable = () => queryInterface.createTable('Emails', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      emailType: {
        type: Sequelize.STRING(500),
        allowNull: false,
        default: 'work',
      },
      email: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      preferred: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
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
      .then(createEmailsTable);
  },
  down: (queryInterface) => {
    const dropEmailsTable = () => queryInterface.dropTable('Emails');
    return Promise.resolve()
      .then(dropEmailsTable);
  },
};