
import { Model } from 'sequelize'

const TransactionModel = (sequelize, DataTypes) => {

  class Transaction extends Model {

    static associate (models) {
      
    }
    
    toJSON () {
      const Transaction = { ...this.dataValues }
      return Transaction
    }
  }


  Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: true,
        field: "id",
        autoIncrement: true
      },
      invoice_number: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "invoice_number",
        autoIncrement: false
      },
      transaction_type: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "transaction_type",
        autoIncrement: false
      },
      description: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "description",
        autoIncrement: false
      },
      total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "total_amount",
        autoIncrement: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
        comment: null,
        primaryKey: false,
        field: "createdAt",
        autoIncrement: false
      }
  },
    {
      sequelize,
      modelName: 'Transaction',
      tableName:"transactions"
    }
  )

  return Transaction;
}

export default TransactionModel


