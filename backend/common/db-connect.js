const config = require('config')
const mongoose = require('mongoose')
const mongooseTimestamp = require('mongoose-timestamp')

mongoose.Promise = global.Promise
mongoose.plugin(mongooseTimestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
const { type, user, pass, host, name } = config.db
const getUrl = () => {
    const uriString = type === 'remote' ? 'mongodb+srv://' : 'mongodb://'
    return `${uriString}${user}:${pass}@${host}/${name}?authSource=admin&retryWrites=true`
}
const options = { useNewUrlParser: true }

module.exports.connect = async () => {
  try {
    console.log(getUrl())
    await mongoose.connect(getUrl(), options)
    console.log(`ongoDB connection successful ${host}`);
  } catch (err) {
    throw err
  }
}