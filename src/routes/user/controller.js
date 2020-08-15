const sample = async (req, res, next) => {
  try {
    res.send('ok');
  } catch (error) {
    next(error);
  }
};

export default {
  sample,
};
