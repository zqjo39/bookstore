'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.belongsToMany(models.Book,{
        through: 'book_author',
        as: 'book',
        foreignKey: 'author_id',
        otherKey: 'book_id',
        timestamps: false
      })
    }
  };
  Author.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    picture: DataTypes.STRING,
    date_of_birth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Author',
    timestamps: false,
    tableName: 'author'
  });
  return Author;
};