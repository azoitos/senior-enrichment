'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

var Campus = db.define('campus', {
  name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: true
      }
  },
  img: {
      type: Sequelize.STRING,
  }
});

module.exports = Campus;
