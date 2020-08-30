import { v4 as uuid } from 'uuid';

import databaseService from './database';


const mapAuthenticationRequestAcrValues = (authenticationRequest) => {
  if (authenticationRequest.acrValues == null) {
    return null;
  }

  return authenticationRequest.acrValues
    .map(acrValue => acrValue.dataValues)
    .sort((a, b) => a.order - b.order)
    .map(i => i.value);
};

const mapAuthenticationRequestClaimsLocales = (authenticationRequest) => {
  if (authenticationRequest.claimsLocales == null) {
    return null;
  }

  return authenticationRequest.claimsLocales
    .map(claimsLocale => claimsLocale.dataValues)
    .sort((a, b) => a.order - b.order)
    .map(i => i.value);
};

const mapAuthenticationRequestPrompts = (authenticationRequest) => {
  if (authenticationRequest.prompts == null) {
    return null;
  }

  return authenticationRequest.prompts
    .map(prompt => prompt.dataValues)
    .sort((a, b) => a.order - b.order)
    .map(i => i.value);
};

const mapAuthenticationRequestResponseTypes = (authenticationRequest) => {
  if (authenticationRequest.responseTypes == null) {
    return null;
  }

  return authenticationRequest.responseTypes
    .map(responseType => responseType.dataValues)
    .sort((a, b) => a.order - b.order)
    .map(i => i.value);
};

const mapAuthenticationRequestScopes = (authenticationRequest) => {
  if (authenticationRequest.scopes == null) {
    return null;
  }

  return authenticationRequest.scopes
    .map(scope => scope.dataValues)
    .sort((a, b) => a.order - b.order)
    .map(i => i.value);
};

const mapAuthenticationRequestUiLocales = (authenticationRequest) => {
  if (authenticationRequest.uiLocales == null) {
    return null;
  }

  return authenticationRequest.uiLocales
    .map(uiLocale => uiLocale.dataValues)
    .sort((a, b) => a.order - b.order)
    .map(i => i.value);
};

const mapAuthenticationRequest = (authenticationRequest) => {
  const loadedAuthenticationRequest = authenticationRequest.dataValues;
  loadedAuthenticationRequest.acrValues = mapAuthenticationRequestAcrValues(authenticationRequest);
  loadedAuthenticationRequest.claimsLocales = mapAuthenticationRequestClaimsLocales(authenticationRequest);
  loadedAuthenticationRequest.prompts = mapAuthenticationRequestPrompts(authenticationRequest);
  loadedAuthenticationRequest.responseTypes = mapAuthenticationRequestResponseTypes(authenticationRequest);
  loadedAuthenticationRequest.scopes = mapAuthenticationRequestScopes(authenticationRequest);
  loadedAuthenticationRequest.uiLocales = mapAuthenticationRequestUiLocales(authenticationRequest);

  const mappedAuthenticationRequest = {
    id: loadedAuthenticationRequest.id,
    client_id: loadedAuthenticationRequest.clientId,
    redirect_uri: loadedAuthenticationRequest.redirectUri,
    state: loadedAuthenticationRequest.state,
    response_mode: loadedAuthenticationRequest.responseMode,
    nonce: loadedAuthenticationRequest.nonce,
    display: loadedAuthenticationRequest.display,
    max_age: loadedAuthenticationRequest.maxAge,
    id_token_hint: loadedAuthenticationRequest.idTokenHint,
    login_hint: loadedAuthenticationRequest.loginHint,
    auth_time: loadedAuthenticationRequest.authTime,
    acr_value: loadedAuthenticationRequest.acrValues,
    claims_locale: loadedAuthenticationRequest.claimsLocales,
    prompt: loadedAuthenticationRequest.prompts,
    response_type: loadedAuthenticationRequest.responseTypes,
    scope: loadedAuthenticationRequest.scopes,
    ui_locale: loadedAuthenticationRequest.uiLocales,
  };

  return mappedAuthenticationRequest;
};

const saveAcrValues = async (authenticationRequest, authenticationRequestId) => {
  try {
    const { AuthenticationRequestAcrValue } = databaseService;
    const id = uuid();

    const { acr_values: acrValues = [] } = authenticationRequest;
    const savableAcrValues = acrValues.map((acrValue, index) => ({
      id: uuid(),
      authenticationRequestId,
      value: acrValue,
      order: index,
      deleted: false,
    }));

    if (savableAcrValues.length > 0) {
      await AuthenticationRequestAcrValue.bulkCreate(savableAcrValues);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveClaimsLocales = async (authenticationRequest, authenticationRequestId) => {
  try {
    const { AuthenticationRequestClaimsLocale } = databaseService;
    const id = uuid();

    const { claims_locales: claimsLocales = [] } = authenticationRequest;
    const savableClaimsLocales = claimsLocales.map((claimsLocale, index) => ({
      id: uuid(),
      authenticationRequestId,
      value: claimsLocale,
      order: index,
      deleted: false,
    }));

    if (savableClaimsLocales.length > 0) {
      await AuthenticationRequestClaimsLocale.bulkCreate(savableClaimsLocales);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const savePrompts = async (authenticationRequest, authenticationRequestId) => {
  try {
    const { AuthenticationRequestPrompt } = databaseService;
    const id = uuid();

    const { prompt: prompts = [] } = authenticationRequest;
    const savablePrompts = prompts.map((prompt, index) => ({
      id: uuid(),
      authenticationRequestId,
      value: prompt,
      order: index,
      deleted: false,
    }));

    if (savablePrompts.length > 0) {
      await AuthenticationRequestPrompt.bulkCreate(savablePrompts);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveResponseTypes = async (authenticationRequest, authenticationRequestId) => {
  try {
    const { AuthenticationRequestResponseType } = databaseService;
    const id = uuid();

    const { response_type: responseTypes = [] } = authenticationRequest;
    const savableResponseTypes = responseTypes.map((responseType, index) => ({
      id: uuid(),
      authenticationRequestId,
      value: responseType,
      order: index,
      deleted: false,
    }));

    if (savableResponseTypes.length > 0) {
      await AuthenticationRequestResponseType.bulkCreate(savableResponseTypes);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveScopes = async (authenticationRequest, authenticationRequestId) => {
  try {
    const { AuthenticationRequestScope } = databaseService;
    const id = uuid();

    const { scope: scopes = [] } = authenticationRequest;
    const savableScopes = scopes.map((scope, index) => ({
      id: uuid(),
      authenticationRequestId,
      value: scope,
      order: index,
      deleted: false,
    }));

    if (savableScopes.length > 0) {
      await AuthenticationRequestScope.bulkCreate(savableScopes);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveUiLocales = async (authenticationRequest, authenticationRequestId) => {
  try {
    const { AuthenticationRequestUiLocale } = databaseService;
    const id = uuid();

    const { ui_locales: uiLocales = [] } = authenticationRequest;
    const savableUiLocales = uiLocales.map((uiLocale, index) => ({
      id: uuid(),
      authenticationRequestId,
      value: uiLocale,
      order: index,
      deleted: false,
    }));

    if (savableUiLocales.length > 0) {
      await AuthenticationRequestUiLocale.bulkCreate(savableUiLocales);
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const saveAuthenticationRequest = async (authenticationRequest) => {
  try {
    const { AuthenticationRequest } = databaseService;
  
    const authenticationRequestId = uuid();
    const savableAuthenticationRequest = {
      id: authenticationRequestId,
      clientId: authenticationRequest.client_id,
      redirectUri: authenticationRequest.redirect_uri,
      state: authenticationRequest.state,
      responseMode: authenticationRequest.response_mode,
      nonce: authenticationRequest.nonce,
      display: authenticationRequest.display,
      maxAge: authenticationRequest.max_age,
      idTokenHint: authenticationRequest.id_token_hint,
      loginHint: authenticationRequest.login_hint,
      authTime: authenticationRequest.auth_time,
      deleted: false,
    };
  
    await AuthenticationRequest.create(savableAuthenticationRequest);
    await saveAcrValues(authenticationRequest, authenticationRequestId);
    await saveClaimsLocales(authenticationRequest, authenticationRequestId);
    await savePrompts(authenticationRequest, authenticationRequestId);
    await saveResponseTypes(authenticationRequest, authenticationRequestId);
    await saveScopes(authenticationRequest, authenticationRequestId);
    await saveUiLocales(authenticationRequest, authenticationRequestId);
    return Promise.resolve(authenticationRequestId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loadAuthenticationRequest = async (authenticationRequestId) => {
  try {
    const {
      AuthenticationRequest,
      AuthenticationRequestAcrValue,
      AuthenticationRequestClaimsLocale,
      AuthenticationRequestPrompt,
      AuthenticationRequestResponseType,
      AuthenticationRequestScope,
      AuthenticationRequestUiLocale,
    } = databaseService;

    const query = {
      where: {
        id: authenticationRequestId,
        deleted: false,
      },
      include: [
        {
          model: AuthenticationRequestAcrValue,
          as: 'acrValues',
          foreignKey: 'authenticationRequestId'
        },
        {
          model: AuthenticationRequestClaimsLocale,
          as: 'claimsLocales',
          foreignKey: 'authenticationRequestId'
        },
        {
          model: AuthenticationRequestPrompt,
          as: 'prompts',
          foreignKey: 'authenticationRequestId'
        },
        {
          model: AuthenticationRequestResponseType,
          as: 'responseTypes',
          foreignKey: 'authenticationRequestId'
        },
        {
          model: AuthenticationRequestScope,
          as: 'scopes',
          foreignKey: 'authenticationRequestId'
        },
        {
          model: AuthenticationRequestUiLocale,
          as: 'uiLocales',
          foreignKey: 'authenticationRequestId'
        }
      ]
    };

    const authenticationRequest = await AuthenticationRequest.findOne(query);
    if (authenticationRequest == null) {
      return Promise.resolve(null);
    }

    const mappedAuthenticationRequest = mapAuthenticationRequest(authenticationRequest);
  
    return Promise.resolve(mappedAuthenticationRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  saveAuthenticationRequest,
  loadAuthenticationRequest,
};
