'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
    static async beforeDestroy(options) {
      await this.sequelize
        .getQueryInterface()
        .removeConstraint('Products', 'Products_userId_fkey');
    }
  
  }

  
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.ARRAY(DataTypes.STRING),
    quantity: DataTypes.STRING,
    category: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.addHook('beforeUpdate', (product) => {
    if (product.changed('exDate')) {
      product.isExpired = product.exDate < new Date();
    }
  });

  return Product;
};