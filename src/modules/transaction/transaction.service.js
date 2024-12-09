import db from '../../db/models/index.js'
import { BadRequestError } from '../../utils/api-errors.js'
import { ApiSuccess } from '../../utils/api-succes.js'
import {
  TOPOP,
  PAYMENT
} from '../../utils/AppConstant.js'
import {
  generateInvoice
} from "./transHelper.js"

/**
 * 
 */
const TransactionService = {
  /**
   * 
   * @param {*} req 
   * @returns 
   */
  doGetBalance: async (req) => {

    const email = req.headers.data.email

    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throw new BadRequestError('User tidak di temukan')
    }

    return ApiSuccess.MessageDataInstance("Get Balance Berhasil", {
      balance: user.balance
    })
  },
  /**
   * 
   * @param {*} req 
   * @returns 
   */
  doTopup: async (req) => {

    const amount = req.body.top_up_amount
    const email = req.headers.data.email

    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throw new BadRequestError('User tidak di temukan')
    }

    // test using raw query
    const query = await db.sequelize.query(
      "WITH balance AS ( " +
      "  select balance from users where id = :userId " +
      ") , " +
      " insert_to_transaction as ( " +
      " insert into transactions ( " +
      "     user_id, " +
      "     invoice_number , " +
      "     transaction_type , " +
      "     description , " +
      "     total_amount " +
      " ) values ( " +
      "   :userId , " +
      "   :invoice , " +
      "   :type , " +
      "   :description , " +
      "   :amount " +
      " )), update_balance as ( " +
      "   UPDATE users SET balance = (balance + :amount) where id = :userId " +
      " ) " +
      " select (balance + :amount ) as balance from balance",
      {
        raw: true,
        replacements: {
          userId: user.id,
          amount: amount,
          type: TOPOP,
          invoice: generateInvoice(),
          description: "Top Up balance"

        },
      })

    return ApiSuccess.MessageDataInstance("Top Up Balance berhasil", query[0])
  },
  /**
   * 
   * @param {*} req 
   */
  doTransaction: async (req) => {
    const email = req.headers.data.email
    const serviceCode = req.body.service_code

    // find service
    const service = await db.Service.findOne({
      where: { service_code: serviceCode }
    })

    if (!service) {
      throw new BadRequestError('Service ataus Layanan tidak ditemukan')
    }

    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throw new BadRequestError('User tidak di temukan')
    }

    if (user.balance < service.service_tariff) {
      throw new BadRequestError('Balance Tidak mencukupi')
    }


    const invoice = generateInvoice()
    // test using raw query
    await db.sequelize.query(
      "WITH balance AS ( " +
      "  select balance from users where id = :userId " +
      ") , " +
      " insert_to_transaction as ( " +
      " insert into transactions ( " +
      "     user_id, " +
      "     invoice_number , " +
      "     transaction_type , " +
      "     description , " +
      "     total_amount ," +
      "     reff_code " +
      " ) values ( " +
      "   :userId , " +
      "   :invoice , " +
      "   :type , " +
      "   :description , " +
      "   :amount ," +
      "   :reffcode " +
      " )), update_balance as ( " +
      "   UPDATE users SET balance = (balance - :amount) where id = :userId " +
      " ) " +
      " select (balance - :amount ) as balance from balance",
      {
        raw: true,
        replacements: {
          userId: user.id,
          amount: service.service_tariff,
          type: PAYMENT,
          invoice: invoice,
          description: service.service_name,
          reffcode: service.service_code
        },
      })

    return ApiSuccess.MessageDataInstance("Transaksi berhasil", {
      invoice_number: invoice,
      service_code: service.service_code,
      service_name: service.service_name,
      transaction_type: PAYMENT,
      total_amount: service.tariff,
      created_on: `${Date(invoice.replaceAll('INV') * 1000)}`
    })
  },
  /**
   * 
   * @param {*} req 
   */
  doGetTransaction: async (req) => {
    const email = req.headers.data.email
    console.log("params" , req)
    const limit = req.query.limit ? req.query.limit : 10
    const offset = req.query.offset ? req.query.offset : 0

    const user = await db.User.findOne({
      where: { email: email }
    })

    if (!user) {
      throw new BadRequestError('User tidak di temukan')
    }

    const transactions = await db.Transaction.findAll({
      raw: true,
      offset: offset, 
      limit: limit,
      attributes: ['invoice_number', 'transaction_type' , 'description' , 'total_amount',['createdAt','create_on']],
      where: {
        deletedAt: null,
      },
      order:[
        ['createdAt',"DESC"]
      ]
    })

    return ApiSuccess.MessageDataInstance("Get History Berhasil", transactions )

  }

}


export default TransactionService