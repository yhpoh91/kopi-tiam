import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import databaseService from './services/database';
import userService from './services/user';
import authenticationRequestService from './services/authenticationRequest';
import authorizationRequestService from './services/authorizationRequest';
import authorizationService from './services/authorization';


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
  if (clientId === 'cid') {
    return Promise.resolve({
      name: 'Example Client',
      id: 'cid',
      secret: 'cs',
      redirectUri: ['http://localhost:8080/callback.html'],
    });
  }
  return Promise.resolve(null);
};

const onGetUserInfo = async (sub, scope) => {
  const {
    LocalUser, Profile,
    Email, PhoneNumber, Address,
  } = databaseService;

  const user = await userService.loadUser(sub, scope);
  return Promise.resolve(user);
};

const onIsConsentGiven = async (sub, scope, clientId) => {
  // Check if client belongs in given consents
  const clientConsents = consents[clientId];
  if (clientConsents == null) {
    return Promise.resolve(false);
  }

  // Check Each of the Scopes
  for (let i = 0; i < scope.length; i += 1) {
    const scopeItem = scope[i];

    // Check if scope belongs in client
    const scopeConsents = clientConsents[scopeItem];
    if (scopeConsents == null) {
      return Promise.resolve(false);
    }

    // Check if user exists within scope consent
    const subConsent = scopeConsents[sub];
    if (subConsent == null) {
      return Promise.resolve(false);
    }
  }

  // No red flags, consent exists
  return Promise.resolve(true);
};

const onSetConsentGiven = async (sub, scope, clientId) => {
  if (consents[clientId] == null) {
    consents[clientId] = {};
  }
  const clientConsents = consents[clientId];

  for (let i = 0; i < scope.length; i += 1) {
    const scopeItem = scope[i];

    if (clientConsents[scopeItem] == null) {
      clientConsents[scopeItem] = {};
    }
    const scopeConsents = clientConsents[scopeItem];
    scopeConsents[sub] = true;
  }

  return Promise.resolve();
};

const onSaveAuthenticationRequest = async (authenticationRequest) => {
  const authenticationRequestId = await authenticationRequestService.saveAuthenticationRequest(authenticationRequest);
  return Promise.resolve(authenticationRequestId);
};

const onLoadAuthenticationRequest = async (authenticationRequestId) => {
  const authenticationRequest = await authenticationRequestService.loadAuthenticationRequest(authenticationRequestId);
  return Promise.resolve(authenticationRequest);
};

const onSaveAuthorizationRequest = async (authenticationRequestId, sub) => {
  const authorizationRequestId = await authorizationRequestService.saveAuthorizationRequest(authenticationRequestId, sub);
  return Promise.resolve(authorizationRequestId);
};

const onLoadAuthorizationRequest = async (authorizationRequestId) => {
  const authorizationRequest = await authorizationRequestService.loadAuthorizationRequest(authorizationRequestId);
  return Promise.resolve(authorizationRequest);
};

const onSaveAuthorization = async (authorizationRequestId) => {
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
  return code;
};

const onLoadAuthorization = async (code) => {
  const authorization = await authorizationService.loadAuthorization(code);
  return Promise.resolve(authorization);
};

const onRevokeAuthorization = async (code) => {
  await authorizationService.revokeAuthorization(code);
  return Promise.resolve(true);
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
