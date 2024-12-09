import InfoService from './info.service.js'
import { generateResponse } from '../../utils/helper.js'

const InfoController = {
    /**
     * get banner
     *
     * @param {Object} httpRequest 
     * @returns {Promise<Object>} 
     */
    getBanner: async (httpRequest) => {
        const bannerServiceData = await InfoService.doGetBanners(httpRequest)
        return generateResponse(bannerServiceData)
    },
    /**
     * 
     * @param {*} httpRequest 
     * @returns 
     */
    getService: async (httpRequest) => {
        const serviceData = await InfoService.doGetService(httpRequest)
        return generateResponse(serviceData)
    }
  }
  
  export default InfoController