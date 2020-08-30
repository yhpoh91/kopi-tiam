import { v4 as uuid } from 'uuid';

import databaseService from './database';

const saveAuthorizationRequest = async (authenticationRequestId, sub) => {
  try {
    const { AuthorizationRequest } = databaseService;

    const authorizationRequestId = uuid();
    const savableAuthorizationRequest = {
      id: authorizationRequestId,
      sub,
      authenticationRequestId,
      deleted: false,
    };

    await AuthorizationRequest.create(savableAuthorizationRequest);
    return Promise.resolve(authorizationRequestId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loadAuthorizationRequest = async (authorizationRequestId) => {
  try {
    const { AuthorizationRequest } = databaseService;
    const query = {
      where: {
        id: authorizationRequestId,
        deleted: false,
      },
    };

    const authorizationRequest = await AuthorizationRequest.findOne(query);
    if (authorizationRequest == null) {
      return Promise.resolve(null);
    }

    const loadedAuthorizationRequest = authorizationRequest.dataValues;
    const mappedAuthorizationRequest = {
      id: loadedAuthorizationRequest.id,
      sub: loadedAuthorizationRequest.sub,
      authenticationRequestId: loadedAuthorizationRequest.authenticationRequestId,
    };

    return Promise.resolve(mappedAuthorizationRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  saveAuthorizationRequest,
  loadAuthorizationRequest,
};
