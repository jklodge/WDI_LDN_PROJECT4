function errorHandler(err, req, res, next) { // eslint-disable-line
  // validation error comes from mongoose
  if(err.name === 'ValidationError') {
    err.status = 422;
    // 422 - unprocessable entity means an error with the form validation
    err.message = 'Unprocessable Entity';
    const errors = {};
    for(const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    err.errors = errors;
  }

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(status).json({ message, errors: err.errors });
}

module.exports = errorHandler;
