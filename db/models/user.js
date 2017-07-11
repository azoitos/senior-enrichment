'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


var User = db.define('user', {
  name: Sequelize.STRING,
})

module.exports = User;
