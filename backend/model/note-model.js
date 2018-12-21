'use strict'

const mongoose = require('mongoose')
const collectionName = 'note'

let noteSchema = new mongoose.Schema({
  title: {type : String, required: true},
  name: {type : String, required: true},//안들어 가는 경우도 있어서, 리콰이어를 빼면 기본값 펄스
  content: {type : String, required: true},
  date: {type: Date, default: Date.now }
}, {
  collection: collectionName
})
module.exports = mongoose.model('note', noteSchema)