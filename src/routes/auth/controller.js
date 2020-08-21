import { v4 as uuid } from 'uuid';

import databaseService from '../../services/database';
import hashService from '../../services/hash';

const login = async (req, res, next) => {
  try {
    const { kopiId } = req;
    const { username, password, authenticationRequestId } = req.body;

    const { LocalUser } = databaseService;

    const query = {
      where: {
        username,
        deleted: false,
      },
    };
    const localUser = await LocalUser.findOne(query);
    if (localUser == null) {
      kopiId.handleAuthenticated(res, authenticationRequestId, 'uid', false, false);
      return;
    }

    // Check Password Check
    const { id: localUserId, passwordHash, passwordSalt } = localUser.dataValues;
    const hashedPassword = await hashService.hash(password, passwordSalt);
    const isUserAuthenticated = passwordHash === hashedPassword;
    
    kopiId.handleAuthenticated(res, authenticationRequestId, localUserId, isUserAuthenticated, false);
  } catch (error) {
    next(error);
  }
};

const consent = async (req, res, next) => {
  try {
    const { kopiId } = req;
    const { authorizationRequestId, isConsentGivenAllow } = req.body;

    kopiId.handleAuthorized(res, authorizationRequestId, isConsentGivenAllow, false);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const {
      username,
      password,
      givenName,
      familyName,
    } = req.body;
    
    const passwordSalt = await hashService.generateSalt();
    const passwordHash = await hashService.hash(password, passwordSalt);
    
    // Create Profile
    const { Profile } = databaseService;
    const profileId = uuid();
    const profile = await Profile.create({
      id: profileId,
      givenName,
      familyName,
      status: 'draft',
      deleted: false,
    });
    const mappedProfile = profile.dataValues;
    console.log(mappedProfile);
    
    // Create Local User
    const { LocalUser } = databaseService;
    const localUserId = uuid();
    const localUser = await LocalUser.create({
      id: localUserId,
      username,
      passwordHash,
      passwordSalt,
      profileId,
      deleted: false,
    });
    const mappedLocalUser = localUser.dataValues;
    console.log(mappedLocalUser);

    // Set Profile to Active
    const changes = { status: 'active' };
    const query = { where: { id: profileId } };
    await Profile.update(changes, query)

    res.json({
      id: profileId,
      givenName,
      familyName,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    res.send('ok');
  } catch (error) {
    next(error);
  }
};

export default {
  login,
  consent,
  register,
  createUser,
};
