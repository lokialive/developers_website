const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  // add type role 11:20-13:45
  data.type = !isEmpty(data.type) ? data.type : ''

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email!'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be empty!'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be empty!'
  }

  // validate for type 11:20-13:47
  if (Validator.isEmpty(data.type)) {
    errors.type = 'You must provide your role type'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
