const { Model } = require('sequelize');

// Export The Function That Creates The Book Model

module.exports = (sequelize, DataTypes) => {

  // Define The Book Model

  class Book extends Model {};

  // Initialize The Book Model

  Book.init({

    title: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: { msg: 'The "Title" Field Cannot Be Blank.' } } },
    author: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: { msg: 'The "Author" Field Cannot Be Blank.' } } },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER

  }, { sequelize });

  return Book;

}