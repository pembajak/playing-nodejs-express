
import { Model } from 'sequelize'

const BannerModel = (sequelize, DataTypes) => {

  class Banner extends Model {

    static associate (models) {
      
    }
    
    toJSON () {
      const banner = { ...this.dataValues }
      return banner
    }
  }


  Banner.init({
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }	,	
      banner_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      banner_image: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      
  },
    {
      sequelize,
      modelName: 'Banner',
      tableName:"banner"
    }
  )



  return Banner;
}

export default BannerModel


