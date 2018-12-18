'use strict'

const mongoose = require('mongoose')
const collectionName = 'customer'

let customerSchema = new mongoose.Schema({
  name: {type : String, required: true},
  email: {type : String, required: true},
  phone: {type : String, required: true},
  company: {type : String, required: true}
}, {
  collection: collectionName
})

module.exports = mongoose.model('customer', customerSchema)