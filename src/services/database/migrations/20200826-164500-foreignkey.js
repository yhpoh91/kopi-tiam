module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToAcrLocale = () => queryInterface.addConstraint('AuthenticationRequestAcrLocales', ['authenticationRequestId'], {
      type: 'foreign key',
      name: 'fk_aracrlocale_authenticationrequestid',
      references: {
        table: 'AuthenticationRequests',
        field: 'id',
      },
    });

    const addForeignKeyToClaimsLocale = () => queryInterface.addConstraint('AuthenticationRequestClaimsLocales', ['authenticationRequestId'], {
      type: 'foreign key',
      name: 'fk_arclaimslocale_authenticationrequestid',
      references: {
        table: 'AuthenticationRequests',
        field: 'id',
      },
    });

    const addForeignKeyToPrompt = () => queryInterface.addConstraint('AuthenticationRequestPrompts', ['authenticationRequestId'], {
      type: 'foreign key',
      name: 'fk_arprompt_authenticationrequestid',
      references: {
        table: 'AuthenticationRequests',
        field: 'id',
      },
    });

    const addForeignKeyToResponseType = () => queryInterface.addConstraint('AuthenticationRequestResponseTypes', ['authenticationRequestId'], {
      type: 'foreign key',
      name: 'fk_arresponsetype_authenticationrequestid',
      references: {
        table: 'AuthenticationRequests',
        field: 'id',
      },
    });

    const addForeignKeyToScope = () => queryInterface.addConstraint('AuthenticationRequestScopes', ['authenticationRequestId'], {
      type: 'foreign key',
      name: 'fk_arscope_authenticationrequestid',
      references: {
        table: 'AuthenticationRequests',
        field: 'id',
      },
    });

    const addForeignKeyToUiLocale = () => queryInterface.addConstraint('AuthenticationRequestUiLocales', ['authenticationRequestId'], {
      type: 'foreign key',
      name: 'fk_aruilocale_authenticationrequestid',
      references: {
        table: 'AuthenticationRequests',
        field: 'id',
      },
    });

    const addForeignKeyToAuthorizationRequest = () => queryInterface.addConstraint('AuthorizationRequests', ['authenticationRequestId'], {
      type: 'foreign key',
      name: 'fk_authorizationrequest_authenticationrequestid',
      references: {
        table: 'AuthenticationRequests',
        field: 'id',
      },
    });

    const addForeignKeyToAuthorization = () => queryInterface.addConstraint('Authorizations', ['authorizationRequestId'], {
      type: 'foreign key',
      name: 'fk_authorization_authorizationrequestId',
      references: {
        table: 'AuthorizationRequests',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToAcrLocale)
      .then(addForeignKeyToClaimsLocale)
      .then(addForeignKeyToPrompt)
      .then(addForeignKeyToResponseType)
      .then(addForeignKeyToScope)
      .then(addForeignKeyToUiLocale)
      .then(addForeignKeyToAuthorizationRequest)
      .then(addForeignKeyToAuthorization);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromAcrLocale = () => queryInterface.removeConstraint('AuthenticationRequestAcrLocales', 'fk_aracrlocale_authenticationrequestid');
    const removeForeignKeyFromClaimsLocale = () => queryInterface.removeConstraint('AuthenticationRequestAcrLocales', 'fk_arclaimslocale_authenticationrequestid');
    const removeForeignKeyFromPrompt = () => queryInterface.removeConstraint('AuthenticationRequestAcrLocales', 'fk_arprompt_authenticationrequestid');
    const removeForeignKeyFromResponseType = () => queryInterface.removeConstraint('AuthenticationRequestAcrLocales', 'fk_arresponsetype_authenticationrequestid');
    const removeForeignKeyFromScope = () => queryInterface.removeConstraint('AuthenticationRequestAcrLocales', 'fk_arscope_authenticationrequestid');
    const removeForeignKeyFromUiLocale = () => queryInterface.removeConstraint('AuthenticationRequestAcrLocales', 'fk_aruilocale_authenticationrequestid');
    
    const removeForeignKeyFromAuthorizationRequest = () => queryInterface.removeConstraint('AuthorizationRequests', 'fk_authorizationrequest_authenticationrequestid');
    const removeForeignKeyFromAuthorization = () => queryInterface.removeConstraint('Authorizations', 'fk_authorization_authorizationrequestId');

    return Promise.resolve()
      .then(removeForeignKeyFromAcrLocale)
      .then(removeForeignKeyFromClaimsLocale)
      .then(removeForeignKeyFromPrompt)
      .then(removeForeignKeyFromResponseType)
      .then(removeForeignKeyFromScope)
      .then(removeForeignKeyFromUiLocale);
  },
};