'use strict'

const jwt = require('jsonwebtoken')
const config = require('config')
const userModel = require('../model/user-model')
const { ERROR } = require('../common/error')
const { raiseError } = require('../common/util')

exports.auth = async (req, res, next) => {
  // request header에 있는 Authorization의 값 예외처리
  const authorizationHeader = req.get('authorization').split(" ");
  if (authorizationHeader[0] !== "Bearer" || typeof authorizationHeader[1] !== "string") {
    raiseError(ERROR.AUTH.AUTHORIZATION_HEADER_EXCEPTION)
  }

  const decoded = jwt.verify(authorizationHeader[1], config.app.secret)
  const user = await userModel.findOne({ id: decoded.id} )
  if (user) {
    req.user = user
    next()
  } else {
    res.status(400).send(err.message)
  } 
}