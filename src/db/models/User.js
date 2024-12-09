
import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

const UserModel = (sequelize, DataTypes) => {

  class User extends Model {

    static associate (models) {
      
    }
    
    toJSON () {
      const user = { ...this.dataValues }
      return user
    }
  }


  User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: true,
        field: "id",
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "email",
        autoIncrement: false,
        unique: "users_email",
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "first_name",
        autoIncrement: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "last_name",
        autoIncrement: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "password",
        autoIncrement: false
      },
      profile_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "profile_image",
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
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "balance",
        autoIncrement: false
      }
      
  },
    {
      sequelize,
      modelName: 'User',
      tableName:"users",
    }
  )



  return User;
}

export default UserModel


