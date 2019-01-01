'use strict'

const mongoose = require('mongoose')
const collectionName = 'reservation'

const reservationSchema = new mongoose.Schema({
  title:{type : String, required: true},
  content:{type : String, required: true},
  reservationHolderName:{type : String, required: true},
  reservationHolderPhone:{type : String, required: true},
  isCustomerInfoSameAsReservationHolder:{type : Boolean, required: true},
  space:{type : String, required: true},
  company:{type : String, required: true},
  customerId:{type : String, required: true},
  customerName:{type : String, required: true},
  customerPhone:{type : String, required: true},
  startDate:{type : String, required: true},
  startTime:{type : String, required: true},
  endDate:{type : String, required: true},
  endTime:{type : String, required: true},
  withdrawDate:{type : String, required: true},
  withdrawTime:{type : String, required: true},
  userId: {type : String, required: true},
  isRemovedReservation: {type : Boolean, required: true},
  downPayment: {type : Boolean, required: true},
  intermediatePayment: {type : Boolean, required: true},
  finalPayment: {type : Boolean, required: true},
}, {
  collection: collectionName
})

module.exports = mongoose.model('reservation', reservationSchema)