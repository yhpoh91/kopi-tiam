import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import databaseService from './services/database';
import clientService from './services/client';
import userService from './services/user';
import authorizationConsentService from './services/authorizationConsent';
import authenticationRequestService from './services/authenticationRequest';
import authorizationRequestService from './services/authorizationRequest';
import authorizationService from './services/authorization';

const defaultRedirectHost = process.env.DEFAULT_REDIRECT_HOST || 'http://localhost:8080';
const authorizationCodeLength = parseInt(process.env.AUTHORIZATION_CODE_LENGTH || '256', 10);

const authenticationRequests = {};
const authorizationRequests = {};
const authorizationCodes = {};
const consents = {};

const generateCode = () => {
  const byteLength = Math.floor(authorizationCodeLength / 2); // 1 byte will have 2 hex length
  const bytes = crypto.randomBytes(byteLength);
  const hex = bytes.toString('hex');
  return hex;
};

const onGetClient = async (clientId) => {
  try {
    const client = await clientService.getClient(clientId);
    return Promise.resolve(client);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onGetUserInfo = async (sub, scope) => {
  try {
    const user = await userService.loadUser(sub, scope);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onIsConsentGiven = async (sub, scope, clientId) => {
  try {
    const isConsentGiven = authorizationConsentService.isUserConsentGiven(clientId, sub, scope);
    return Promise.resolve(isConsentGiven);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onSetConsentGiven = async (sub, scope, clientId) => {
  try {
    await authorizationConsentService.setUserConsentGiven(clientId, sub, scope);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const onSaveAuthenticationRequest = async (authenticationRequest) => {
  try {
    const authenticationRequestId = await authenticationRequestService.saveAuthenticationRequest(authenticationRequest);
    return Promise.resolve(authenticationRequestId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onLoadAuthenticationRequest = async (authenticationRequestId) => {
  try {
    const authenticationRequest = await authenticationRequestService.loadAuthenticationRequest(authenticationRequestId);
    return Promise.resolve(authenticationRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onSaveAuthorizationRequest = async (authenticationRequestId, sub) => {
  try {
    const authorizationRequestId = await authorizationRequestService.saveAuthorizationRequest(authenticationRequestId, sub);
    return Promise.resolve(authorizationRequestId);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onLoadAuthorizationRequest = async (authorizationRequestId) => {
  try {
    const authorizationRequest = await authorizationRequestService.loadAuthorizationRequest(authorizationRequestId);
    return Promise.resolve(authorizationRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onSaveAuthorization = async (authorizationRequestId) => {
  try {
    const maxAttempts = 10;
    let attempts = 0;
    let saved = false;

    let code;
    while (!saved) {
      try {
        code = generateCode();
        await authorizationService.saveAuthorization(authorizationRequestId, code);
        saved = true;
      } catch (error) {
        if (attempts < maxAttempts) {
          console.error(error.message);
          saved = false;
        }
        return Promise.reject(error);
      }
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onLoadAuthorization = async (code) => {
  try {
    const authorization = await authorizationService.loadAuthorization(code);
    return Promise.resolve(authorization);
  } catch (error) {
    return Promise.reject(error);
  }
};

const onRevokeAuthorization = async (code) => {
  try {
    await authorizationService.revokeAuthorization(code);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  onGetClient,
  onGetUserInfo,

  onIsConsentGiven,
  onSetConsentGiven,

  onSaveAuthenticationRequest,
  onLoadAuthenticationRequest,

  onSaveAuthorizationRequest,
  onLoadAuthorizationRequest,

  onSaveAuthorization,
  onLoadAuthorization,
  onRevokeAuthorization,
};
