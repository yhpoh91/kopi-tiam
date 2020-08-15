const login = async (req, res, next) => {
  try {
    res.send('ok');
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    res.send('ok');
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
  register,
  createUser,
};
