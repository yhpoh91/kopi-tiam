import databaseService from './database';

const mapEmails = (profile) => {
  if (profile.emails == null) {
    return [];
  }

  const loadedEmails = profile.emails.map(email => email.dataValues);
  const mappedEmails = loadedEmails.map(email => ({
    id: email.id,
    name: email.name,
    type: email.emailType,
    email: email.email,
    verified: email.verified,
    preferred: email.preferred,
  }));

  return mappedEmails;
};

const mapPhoneNumbers = (profile) => {
  if (profile.phoneNumbers == null) {
    return [];
  }

  const loadedPhoneNumbers = profile.phoneNumbers.map(phoneNumber => phoneNumber.dataValues);
  const mappedPhoneNumbers = loadedPhoneNumbers.map(phoneNumber => ({
    id: phoneNumber.id,
    name: phoneNumber.name,
    type: phoneNumber.phoneNumberType,
    phone_number: phoneNumber.phoneNumber,
    verified: phoneNumber.verified,
    preferred: phoneNumber.preferred,
  }));

  return mappedPhoneNumbers;
};

const mapAddresses = (profile) => {
  if (profile.addresses == null) {
    return [];
  }

  const loadedAddresses = profile.addresses.map(address => address.dataValues);
  const mappedAddresses = loadedAddresses.map(address => ({
    id: address.id,
    formatted: `${address.streetAddress}, ${address.locality}, ${addres.region}, ${address.postalCode}, ${address.country}`,
    street_address: address.streetAddress,
    locality: address.locality,
    region: address.region,
    postal_code: address.postalCode,
    country: address.country,
    verified: address.verified,
    preferred: address.preferred,
  }));

  return mappedAddresses;
};

const mapProfile = (user, scopes) => {
  if (user.profile == null) {
    return {};
  }

  const loadedProfile = user.profile.dataValues;
  const mappedProfile = {};

  if (scopes.includes('profile')) {
    mappedProfile.name = `${loadedProfile.givenName} ${loadedProfile.familyName}`;
    mappedProfile.family_name = loadedProfile.familyName;
    mappedProfile.given_name = loadedProfile.givenName;
    mappedProfile.middle_name = loadedProfile.middleName;
    mappedProfile.nickname = loadedProfile.nickname;
    mappedProfile.preferred_username = loadedProfile.preferredUsername;
    mappedProfile.profile = loadedProfile.profile;
    mappedProfile.picture = loadedProfile.picture;
    mappedProfile.website = loadedProfile.website;
    mappedProfile.gender = loadedProfile.gender;
    mappedProfile.birthdate = loadedProfile.birthdate;
    mappedProfile.zoneinfo = loadedProfile.zoneInfo;
    mappedProfile.nationality = loadedProfile.nationality;
    mappedProfile.updated_at = loadedProfile.updatedAt;
  }

  if (scopes.includes('email')) {
    mappedProfile.emails = mapEmails(loadedProfile);

    let email;
    const preferredEmails = mappedProfile.emails.filter(email => email.preferred);
    if (preferredEmails.length > 0) {
      email = preferredEmails[0];
    } else if (mappedProfile.emails.length > 0) {
      email = mappedProfile.emails[0];
    } else {
      email = {};
    }

    mappedProfile.email = email.email;
    mappedProfile.email_verified = email.verified;
  }

  if (scopes.includes('phone')) {
    mappedProfile.phoneNumbers = mapPhoneNumbers(loadedProfile);

    let phoneNumber;
    const preferredPhoneNumbers = mappedProfile.phoneNumbers.filter(phoneNumber => phoneNumber.preferred);
    if (preferredPhoneNumbers.length > 0) {
      phoneNumber = preferredPhoneNumbers[0];
    } else if (mappedProfile.phoneNumbers.length > 0) {
      phoneNumber = mappedProfile.phoneNumbers[0];
    } else {
      phoneNumber = {};
    }

    mappedProfile.phone_number = phoneNumber.phoneNumber;
    mappedProfile.phone_number_verified = phoneNumber.verified;
  }

  if (scopes.includes('address')) {
    mappedProfile.addresses = mapAddresses(loadedProfile);

    let address;
    const preferredAddresses = mappedProfile.addresses.filter(address => address.preferred);
    if (preferredAddresses.length > 0) {
      address = preferredAddresses[0];
    } else if (mappedProfile.addresses.length > 0) {
      address = mappedProfile.addresses[0];
    } else {
      address = {};
    }

    mappedProfile.address = address;
  }

  return mappedProfile;
}

const mapUser = (user, scopes) => {
  const loadedUser = user.dataValues;
  const mappedProfile = mapProfile(loadedUser, scopes);

  const mappedUser = {
    sub: loadedUser.id,
    ...mappedProfile,
  };
  return mappedUser;
};

const loadUser = async (sub, scopes) => {
  try {
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
  
    const mappedLocalUser = mapUser(localUser, scopes);
    return Promise.resolve(mappedLocalUser);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  loadUser,
}