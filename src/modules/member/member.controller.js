import MemberService from './member.service.js'
import { generateResponse } from '../../utils/helper.js'

const MemberController = {
    /**
     * Register member
     *
     * @param {Object} httpRequest 
     * @returns {Promise<Object>} 
     */
    register: async (httpRequest) => {
        const memberServiceRegisterData = await MemberService.doRegister(httpRequest.body)
        return generateResponse(memberServiceRegisterData)
    },

     /**
     * Login member
     *
     * @param {Object} httpRequest 
     * @returns {Promise<Object>} 
     */
    login: async (httpRequest) => {
        const memberServiceLoginData = await MemberService.doLogin(httpRequest.body)
        return generateResponse(memberServiceLoginData)
    },

     /**
     * profil member
     *
     * @param {Object} httpRequest 
     * @returns {Promise<Object>} 
     */
     getProfile: async (httpRequest) => {
        const memberServiceProfilData = await MemberService.getProfile(httpRequest)
        return generateResponse(memberServiceProfilData)
    },

     /**
     * update member
     *
     * @param {Object} httpRequest 
     * @returns {Promise<Object>} 
     */
     updateProfile: async (httpRequest) => {
        const memberServiceUpdateProfilData = await MemberService.updateProfile(httpRequest)
        return generateResponse(memberServiceUpdateProfilData)
    },
    /**
     * uploadProfile 
     *
     * @param {Object} httpRequest 
     * @returns {Promise<Object>} 
     */
    uploadProfile: async (httpRequest) => {
        const memberServiceuploadProfileData = await MemberService.uploadProfile(httpRequest)
        return generateResponse(memberServiceuploadProfileData)
    }
  }
  
  export default MemberController