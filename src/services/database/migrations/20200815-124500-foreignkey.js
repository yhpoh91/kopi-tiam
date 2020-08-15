module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToLocalUser = () => queryInterface.addConstraint('LocalUsers', ['profileId'], {
      type: 'foreign key',
      name: 'fk_localuser_profileid',
      references: {
        table: 'Profiles',
        field: 'id',
      },
    });
    const addForeignKeyToAddress = () => queryInterface.addConstraint('Addresses', ['profileId'], {
      type: 'foreign key',
      name: 'fk_address_profileid',
      references: {
        table: 'Profiles',
        field: 'id',
      },
    });
    const addForeignKeyToEmail = () => queryInterface.addConstraint('Emails', ['profileId'], {
      type: 'foreign key',
      name: 'fk_email_profileid',
      references: {
        table: 'Profiles',
        field: 'id',
      },
    });
    const addForeignKeyToPhoneNumber = () => queryInterface.addConstraint('PhoneNumbers', ['profileId'], {
      type: 'foreign key',
      name: 'fk_phonenumber_profileid',
      references: {
        table: 'Profiles',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToLocalUser)
      .then(addForeignKeyToAddress)
      .then(addForeignKeyToEmail)
      .then(addForeignKeyToPhoneNumber)
      .catch(console.error);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromLocalUser = () => queryInterface.removeConstraint('LocalUsers', 'fk_localuser_profileid');
    const removeForeignKeyFromAddress = () => queryInterface.removeConstraint('Addresses', 'fk_address_profileid');
    const removeForeignKeyFromEmail = () => queryInterface.removeConstraint('Emails', 'fk_email_profileid');
    const removeForeignKeyFromPhoneNumber = () => queryInterface.removeConstraint('PhoneNumbers', 'fk_phonenumber_profileid');

    return Promise.resolve()
      .then(removeForeignKeyFromLocalUser)
      .then(removeForeignKeyFromAddress)
      .then(removeForeignKeyFromEmail)
      .then(removeForeignKeyFromPhoneNumber)
      .catch(console.error);
  },
};