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
     * 
     * @param {t} httpRequest 
     * @returns 
     */
    validateTopup: (httpRequest) => {
      const schema = Joi.object({
        top_up_amount: Joi.number().greater(-1).required()
        .messages({
          'number.min': 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
          'number.base': 'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'
        }),
      })
      return schema.validate(httpRequest.body, options)
    },
    
  }