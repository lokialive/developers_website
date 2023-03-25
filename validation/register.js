const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''
  // add type role 11:20-13:45
  data.type = !isEmpty(data.type) ? data.type : ''

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Username shoudl between 2 and 30 letters!'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Username field cannot be empty!'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field cannot be empty!'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email input!'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passwork cannot be empty!'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'The password should between 6 and 30 letters!'
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field cannot be empty!'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'The two password should be the same as each other!'
  }

  // validate for type 11:20-13:47

  if (Validator.isEmpty(data.type)) {
    errors.type = 'You must choose your role type'

  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
