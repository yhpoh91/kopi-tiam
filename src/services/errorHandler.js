const showStack = (process.env.SHOW_RESPONSE_STACK || 'false') === true;

const handleError = (err, req, res, next) => {
  console.error(err);
  const response = {
    code: err.status || 500,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };

  if (!showStack) {
    delete response.stack;
  }

  res.status(err.status || 500);
  res.json(response);
};

export default {
  handleError,
};
