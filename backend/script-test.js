'use strict'

const mongoose = require('mongoose')
const config = require('config')

/**
 * @typedef {object} config
 * @property db {object}
 */

const connect = async () => {
  try {

    const getConnectionUrl = () => {
      const { user, pass, host, name } = config.db
      return `mongodb://${user}:${pass}@${host}/${name}?authSource=admin`
    }
    const options = { useNewUrlParser: true }
    const client = await mongoose.connect(getConnectionUrl(), options)
    console.log('db connect success', client)
  } catch (err) {
    throw err
  }
}

connect()