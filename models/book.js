'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.belongsToMany(models.Author, {
        through: 'book_author',
        as: 'author',
        foreignKey: 'book_id',
        otherKey: 'author_id',
        timestamps: false
      })
    }
  };
  Book.init({
    title: DataTypes.STRING,
    publisher: DataTypes.STRING,
    genre: DataTypes.STRING,
    page_count: DataTypes.INTEGER,
    cover_image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
    timestamps: false,
    tableName: 'book'
  });
  return Book;
};