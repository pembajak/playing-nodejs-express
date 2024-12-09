import Joi from 'joi'

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
}

export default {
  /**
   * Validates a register request.
   */
  validateRegister: (httpRequest) => {
    const schema = Joi.object({
      password: Joi.string().min(8).max(20).alphanum().required()
      .messages({
        'string.min': 'Password minimal 8 karakter',
        'string.empty': 'Silahkan masukan password'
      }),
      email: Joi.string().email().required()
      .messages({
        'string.email': 'Paramter email tidak sesuai format',
        'string.empty': 'Silahkan masukan email'
      }),
      first_name: Joi.string().required()
      .messages({
        'string.empty': 'Silahkan masukan first_name'
      }),
      last_name: Joi.string().required()
      .messages({
        'string.empty': 'Silahkan masukan last_name'
      })
    })
    return schema.validate(httpRequest.body, options)
  },
  validateLogin: (httpRequest) => {
    const schema = Joi.object({
      password: Joi.string().min(8).max(20).alphanum().required()
      .messages({
        'string.min': 'Password minimal 8 karakter',
        'string.empty': 'Silahkan masukan password'
      }),
      email: Joi.string().email().required()
      .messages({
        'string.email': 'Paramter email tidak sesuai format',
        'string.empty': 'Silahkan masukan email'
      })
    })
    return schema.validate(httpRequest.body, options)
  }
}
