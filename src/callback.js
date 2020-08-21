import crypto from 'crypto';
import { v4 as uuid } from 'uuid';

import databaseService from './services/database';
import { profile } from 'console';


const AUTHORIZATION_CODE_LENGTH = 256;

const authenticationRequests = {};
const authorizationRequests = {};
const authorizationCodes = {};
const consents = {};

const generateCode = () => {
  const byteLength = Math.floor(AUTHORIZATION_CODE_LENGTH / 2); // 1 byte will have 2 hex length
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
  const query = {
    where: { id: sub, deleted: false },
    include: [
      {
        model: Profile,
        as: 'profile',
        foreignKey: 'profileId',
        where: {
          deleted: false,
        },
        required: true,
        include: [
          {
            model: Email,
            as: 'emails',
            foreignKey: 'profileId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: PhoneNumber,
            as: 'phoneNumbers',
            foreignKey: 'profileId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: Address,
            as: 'addresses',
            foreignKey: 'profileId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      },
    ],
  };

  // Load from Database
  const localUser = await LocalUser.findOne(query);
  if (localUser == null) {
    return Promise.resolve(null);
  }
  const mappedLocalUser = localUser.dataValues;
  const user = { sub };

  // Profile
  if (scope.includes('profile') && mappedLocalUser.profile) {
    const { profile } = mappedLocalUser;
    const mappedProfile = profile.dataValues;

    user.name = `${mappedProfile.givenName} ${mappedProfile.familyName}`;
    user.family_name = mappedProfile.familyName;
    user.given_name = mappedProfile.givenName;
    user.middle_name = mappedProfile.middleName;
    user.nickname = mappedProfile.nickname;
    user.preferred_username = mappedProfile.preferredUsername;
    user.profile = mappedProfile.profile;
    user.picture = mappedProfile.picture;
    user.website = mappedProfile.website;
    user.gender = mappedProfile.gender;
    user.birthdate = mappedProfile.birthdate;
    user.zoneinfo = mappedProfile.zoneInfo;
    user.nationality = mappedProfile.nationality;
    user.updated_at = mappedProfile.updatedAt;
  }

  // Email
  if (scope.includes('email') && mappedLocalUser.profile && mappedLocalUser.profile.dataValues.emails) {
    const { emails } = mappedLocalUser.profile.dataValues;
    user.emails = [];

    for (let i = 0; i < emails.length; i += 1) {
      const email = emails[i].dataValues;

      const mappedEmail = {
        id: email.id,
        name: email.name,
        type: email.emailType,
        email: email.email,
        verified: email.verified,
        preferred: email.preferred,
      };

      emails.push(mappedEmail);
      if (i === 0 || (email.preferred && user.email == null)) {
        user.email = email.email;
        user.email_verified = email.verified;
      }
    }
  }

  // Phone
  if (scope.includes('phone') && mappedLocalUser.profile && mappedLocalUser.profile.dataValues.phoneNumbers) {
    const { phoneNumbers } = mappedLocalUser.profile.dataValues;
    user.phone_numbers = [];

    for (let i = 0; i < phoneNumbers.length; i += 1) {
      const phoneNumber = phoneNumbers[i].dataValues;

      const mappedPhoneNumber = {
        id: phoneNumber.id,
        name: phoneNumber.name,
        type: phoneNumber.phoneNumberType,
        phone_number: phoneNumber.phoneNumber,
        verified: phoneNumber.verified,
        preferred: phoneNumber.preferred,
      };

      phone_numbers.push(mappedPhoneNumber);
      if (i === 0 || (phoneNumber.preferred && user.phone_number == null)) {
        user.phone_number = phoneNumber.phoneNumber;
        user.phone_number_verified = phoneNumber.verified;
      }
    }
  }

  // Address
  if (scope.includes('address') && mappedLocalUser.profile && mappedLocalUser.profile.dataValues.addresses) {
    const { addresses } = mappedLocalUser.profile.dataValues;
    user.addresses = [];

    for (let i = 0; i < addresses.length; i += 1) {
      const address = addresses[i].dataValues;
      
      const mappedAddress = {
        id: address.id,
        formatted: `${address.streetAddress}, ${address.locality}, ${addres.region}, ${address.postalCode}, ${address.country}`,
        street_address: address.streetAddress,
        locality: address.locality,
        region: address.region,
        postal_code: address.postalCode,
        country: address.country,
        verified: address.verified,
        preferred: address.preferred,
      }

      user.addresses.push(mappedAddress);
      if (i === 0 || (address.preferred && user.address == null)) {
        user.address = mappedAddress;
      }
    }
  }

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
  const authenticationRequestId = uuid();
  authenticationRequests[authenticationRequestId] = authenticationRequest;
  return Promise.resolve(authenticationRequestId);
};

const onLoadAuthenticationRequest = async (authenticationRequestId) => {
  return Promise.resolve(authenticationRequests[authenticationRequestId]);
};

const onSaveAuthorizationRequest = async (authenticationRequestId, sub) => {
  const authorizationRequestId = uuid();
  authorizationRequests[authorizationRequestId] = {
    authenticationRequestId,
    sub,
  };
  return Promise.resolve(authorizationRequestId);
};

const onLoadAuthorizationRequest = async (authorizationRequestId) => {
  return Promise.resolve(authorizationRequests[authorizationRequestId]);
};

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
