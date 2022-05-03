const passwordValidator = require('password-validator');

//--Password schema--//
const passwordSchema = new passwordValidator();

//--Password properties--//

passwordSchema
  .is().min(10)
  .is().max(30)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .symbols()
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123'])

// Validate against a password string
console.log(passwordSchema.validate('validPASS123'));
// => true
console.log(passwordSchema.validate('invalidPASS'));
// => false

// Get a full list of rules which failed
console.log(passwordSchema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]

module.exports = passwordSchema;