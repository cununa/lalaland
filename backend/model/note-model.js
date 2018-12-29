'use strict'

const mongoose = require('mongoose')
const mongooseTimestamp = require('mongoose-timestamp')
const collectionName = 'note'

let noteSchema = new mongoose.Schema({
  title: {type : String, required: true},
  userId: {type : String, required: true},//안들어 가는 경우도 있어서, 리콰이어를 빼면 기본값 펄스
  content: {type : String, required: true}
}, {
  collection: collectionName
})

noteSchema.plugin(mongooseTimestamp);

module.exports = mongoose.model('note', noteSchema)