'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    id:{ 
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleid: DataTypes.STRING,
    positionID: DataTypes.STRING,
    phoneNumber: DataTypes.STRING, 
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};