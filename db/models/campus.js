'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

var Campus = db.define('campus', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  img: {
      type: Sequelize.STRING,
  }
});

module.exports = Campus;
