const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
  let errors = {}

  data.text = !isEmpty(data.text) ? data.text : ''

  if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
    errors.text = 'Your input should between 5 and 300 letters!'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Input cannot be empty!'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
