import { v4 as uuid } from 'uuid';

import databaseService from './database';


const onSaveAuthorization = async (authorizationRequestId) => {
  // Clash avoiding
  let code = generateCode();
  while (authorizationCodes[code] != null) {
    code = generateCode();
  }

  // Save to Map
  authorizationCodes[code] = authorizationRequestId;
  return code;
};

const onLoadAuthorization = async (code) => {
  return Promise.resolve(authorizationCodes[code]);
};

const onRevokeAuthorization = async (code) => {
  // Check if exists before delete
  let existed = true;
  const data = authorizationCodes[code];
  if (data == null) {
    existed = false;
  }

  // Delete saved data
  delete authorizationCodes[code];

  // Return whether deleted (if previously doesn't exist, return false as no deletion happened)
  return Promise.resolve(existed);
};

const saveAuthorization = async (authorizationRequestId, code) => {
  try {
    const { Authorization } = databaseService;
    const authorizationId = uuid();
    const savableAuthorization = {
      id: authorizationId,
      code,
      authorizationRequestId,
      deleted: false,
    };
    await Authorization.create(savableAuthorization);
    return Promise.resolve(authorizationId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loadAuthorization = async (code) => {
  try {
    const { Authorization } = databaseService;
    const query = {
      where: {
        code,
        deleted: false,
      },
    };

    const authorization = await Authorization.findOne(query);
    if (authorization == null) {
      return Promise.resolve(null);
    }

    const loadedAuthorization = authorization.dataValues;
    const mappedAuthorization = {
      id: loadedAuthorization.id,
      code: loadedAuthorization.code,
      authorizationRequestId: loadedAuthorization.authorizationRequestId,
    };

    return Promise.resolve(mappedAuthorization);
  } catch (error) {
    return Promise.reject(error);
  }
};

const revokeAuthorization = async (code) => {
  try {
    const { Authorization } = databaseService;
    const query = {
      where: {
        code,
        deleted: false,
      },
    };
    const changes = {
      deleted: false,
    }
    await Authorization.update(changes, query);

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  saveAuthorization,
  loadAuthorization,
  revokeAuthorization,
};
