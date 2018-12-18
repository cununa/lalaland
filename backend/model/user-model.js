'use strict'

const mongoose = require('mongoose')
const collectionName = 'user'

let userSchema = new mongoose.Schema({
  name: {type : String, required: true},
  email: {type : String, required: true},
  phone: {type : String, required: true},
  password: {type : String, required: true}
}, {
  collection: collectionName
})

module.exports = mongoose.model('user', userSchema)