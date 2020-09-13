import databaseService from './database';

const defaultRedirectHost = process.env.DEFAULT_REDIRECT_HOST || 'http://localhost:8080';

const getClient = async (clientId) => {
  try {
    if (clientId === 'cid') {
      return Promise.resolve({
        name: 'Example Client',
        id: 'cid',
        secret: 'cs',
        redirectUri: [`${defaultRedirectHost}/callback.html`],
      });
    }
    return Promise.resolve(null);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  getClient,
};
