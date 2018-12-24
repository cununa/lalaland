'use strict'

const mongoose = require('mongoose')
const collectionName = 'reservation'

let customerSchema = new mongoose.Schema({
  title: {type : String, required: true},
  space: {type : String, required: true},
  userName: {type : String, required: true},
  start: {type : Date, required: true},
  end: {type : Date, required: true},
  lastend: {type : Date, required: true},
  reservationName:{type : String, required: true},
  reservationPhone:{type : String, required: true},
  company:{type : String, required: true},
  name:{type : String, required: true},
  phone:{type : String, required: true}

}, {
  collection: collectionName
})

module.exports = mongoose.model('customer', customerSchema)