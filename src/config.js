import callbacks from './callback';

const config = {
  host: process.env.HOST || 'http://localhost:8080',
  logLevel: process.env.LOG_LEVEL || 'info',
  showResponseStack: (process.env.SHOW_RESPONSE_STACK || 'false') === 'true',

  loginPage: 'login.html',
  consentPage: 'consent.html',

  jwtAlgorithm: process.env.KID_JWT_ALGORITHM || 'HS512',
  hashAlgorithm: process.env.KID_HASH_ALGORITHM || 'sha512',

  idTokenExpiresIn: parseInt(process.env.KID_ID_TOKEN_EXPIRES_IN || '3600', 10),
  accessTokenSecret: process.env.KID_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: parseInt(process.env.KID_ACCESS_TOKEN_EXPIRES_IN || '3600', 10),
  authorizationCodeLength: parseInt(process.env.KID_AUTHORIZATION_CODE_LENGTH || '256', 10),
  
  // Client
  onGetClient: callbacks.onGetClient,

  // User
  onGetUserInfo: callbacks.onGetUserInfo,

  // Managed Consent
  onIsConsentGiven: callbacks.onIsConsentGiven,
  onSetConsentGiven: callbacks.onSetConsentGiven,

  // Authentication Request
  onSaveAuthenticationRequest: callbacks.onSaveAuthenticationRequest,
  onLoadAuthenticationRequest: callbacks.onLoadAuthenticationRequest,

  // Authorization Request
  onSaveAuthorizationRequest: callbacks.onSaveAuthorizationRequest,
  onLoadAuthorizationRequest: callbacks.onLoadAuthorizationRequest,

  // Authorization
  onSaveAuthorization: callbacks.onSaveAuthorization,
  onLoadAuthorization: callbacks.onLoadAuthorization,
  onRevokeAuthorization: callbacks.onRevokeAuthorization,
};

export default config;