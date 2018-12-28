'use strict'

const jwt = require('jsonwebtoken')
const config = require('config')
const userModel = require('../model/user-model')

exports.auth = async (req, res, next) => {
  const token = req.get('accessToken')
  if (typeof token === 'undefined') {
    res.sendStatus(403)
    return 
  }
  const decoded = jwt.verify(token, config.app.secret)
  const user = await userModel.findOne({ id: decoded.id} )
  if (user) {
    req.user = user
    next()
  } else {
    res.status(400).send(err.message)
  } 
}