import TransactionService from './transaction.service.js'
import { generateResponse } from '../../utils/helper.js'

const TransactionController = {
    
    getBalance: async (httpRequest) => {
        const balanceService = await TransactionService.doGetBalance(httpRequest)
        return generateResponse(balanceService)
    },

    doTopup: async (httpRequest) => {
        const topupService = await TransactionService.doTopup(httpRequest)
        return generateResponse(topupService)
    },
    doTransaction: async (httpRequest) => {
        const transactionService = await TransactionService.doTransaction(httpRequest)
        return generateResponse(transactionService)
    },
    doGetTransaction: async (httpRequest) => {
        const transactionService = await TransactionService.doGetTransaction(httpRequest)
        return generateResponse(transactionService)
    },
    
  }
  
  export default TransactionController