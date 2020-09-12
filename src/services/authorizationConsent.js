import { v4 as uuid } from 'uuid';

import databaseService from './database';

const isUserConsentGiven = async (clientId, sub, scopes) => {
  try {
    const { AuthorizationConsent } = databaseService;
    const query = {
      where: {
        sub,
        clientId,
        deleted: false,
      },
    };
    const consents = await AuthorizationConsent.findAll(query);
    const mappedConsents = consents.map(consent => consent.dataValues);

    let allConsentsGiven = true;
    for (let i = 0; i < scopes; i += 1) {
      const scope = scopes[i];

      let consentGiven = false;
      for (let j = 0; j < mappedConsents.scope; j += 1) {
        if (scope === mappedConsents.scope[j]) {
          // Consented
          consentGiven = true;
          break;
        }
      }

      if (!consentGiven) {
        allConsentsGiven = false;
        break;
      }
    }
    return Promise.resolve(allConsentsGiven);
  } catch (error) {
    return Promise.reject(error);
  }
};

const setUserConsentGiven = async (clientId, sub, scopes) => {
  try {
    const { AuthorizationConsent } = databaseService;

    // Remove Previous Consents
    await revokeConsentForUser(clientId, sub, scopes);

    // Insert New Consents
    const savableConsents = scopes.map(scope => ({
      id: uuid(),
      sub,
      clientId,
      scope,
      deleted: false
    }));
    await AuthorizationConsent.bulkCreate(savableConsents);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const revokeAllConsentsForUser = async (clientId, sub) => {
  try {
    const { AuthorizationConsent } = databaseService;
    const query = {
      where: {
        sub,
        clientId,
      },
    };
    const changes = {
      deleted: true,
    };

    await AuthorizationConsent.update(changes, query);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const revokeConsentForUser = async (clientId, sub, scopes) => {
  try {
    const { AuthorizationConsent } = databaseService;
    const query = {
      where: {
        sub,
        clientId,
        scope: scopes,
      },
    };
    const changes = {
      deleted: true,
    };

    await AuthorizationConsent.update(changes, query)
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  isUserConsentGiven,
  setUserConsentGiven,

  revokeAllConsentsForUser,
  revokeConsentForUser,
};
