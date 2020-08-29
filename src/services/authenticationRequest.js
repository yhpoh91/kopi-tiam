import { v4 as uuid } from 'uuid';

import databaseService from './database';

const saveAcrValues = async (authenticationRequest, authenticationRequestId) => {
  try {
    const { AuthenticationRequestAcrValue } = databaseService;
    const id = uuid();

    const { acr_values: acrValues } = authenticationRequest;
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

    const { claims_locales: claimsLocales } = authenticationRequest;
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

    const { prompt: prompts } = authenticationRequest;
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

    const { response_type: responseTypes } = authenticationRequest;
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

    const { scope: scopes } = authenticationRequest;
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

    const { ui_locales: uiLocales } = authenticationRequest;
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
  
    await saveAcrValues(authenticationRequest, authenticationRequestId);
    await saveClaimsLocales(authenticationRequest, authenticationRequestId);
    await savePrompts(authenticationRequest, authenticationRequestId);
    await saveResponseTypes(authenticationRequest, authenticationRequestId);
    await saveScopes(authenticationRequest, authenticationRequestId);
    await saveUiLocales(authenticationRequest, authenticationRequestId);
    await AuthenticationRequest.create();
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
  
    return Promise.resolve(authenticationRequests[authenticationRequestId]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  saveAuthenticationRequest,
  loadAuthenticationRequest,
};
