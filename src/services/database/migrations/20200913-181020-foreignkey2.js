module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToRedirectUri = () => queryInterface.addConstraint('ClientRedirectUris', ['clientId'], {
      type: 'foreign key',
      name: 'fk_clientredirecturi_clientid',
      references: {
        table: 'Clients',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToRedirectUri);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromRedirectUri = () => queryInterface.removeConstraint('ClientRedirectUris', 'fk_clientredirecturi_clientid');

    return Promise.resolve()
      .then(removeForeignKeyFromRedirectUri);
  },
};