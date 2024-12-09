import db from '../../db/models/index.js'
import { InternalServerError } from '../../utils/api-errors.js'
import { ApiSuccess } from '../../utils/api-succes.js'

/**
 * 
 */
const InfoService = {
    
    doGetBanners: async () => {
      try {
        const banner = await db.Banner.findAll({raw: true,
          attributes: ['banner_name', 'banner_image' , 'description' ,['createdAt','create_on']],
          where: {
            deletedAt: null,
          },
        })

        return ApiSuccess.DataInstance(banner)

      } catch (error) {
        throw new InternalServerError('services error')
      }
    },
    /**
     * get service data
     */
    doGetService : async () =>{
      try {
        const services = await db.Service.findAll({raw: true,
          attributes: ['service_code', 'service_name' , 'service_icon' , 'service_tariff'],
          where: {
            deletedAt: null,
          },
        })
        return ApiSuccess.DataInstance(services)

      } catch (error) {
        throw new InternalServerError('services error')
      }
    }
  }
  
  
  export default InfoService