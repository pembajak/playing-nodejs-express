
import { Model } from 'sequelize'

const ServiceModel = (sequelize, DataTypes) => {

  class Service extends Model {

    static associate (models) {
      
    }
    
    toJSON () {
      const banner = { ...this.dataValues }
      return banner
    }
  }


  Service.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: true,
        field: "id",
        autoIncrement: true
      },
      service_code: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "service_code",
        autoIncrement: false
      },
      service_icon: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "service_icon",
        autoIncrement: false
      },
      service_name: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "service_name",
        autoIncrement: false
      },
      service_tariff: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "service_tariff",
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
      modelName: 'Service',
      tableName:"services"
    }
  )



  return Service;
}

export default ServiceModel


