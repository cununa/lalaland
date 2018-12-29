'use strict'

const jwt = require('jsonwebtoken')
const config = require('config')
const userModel = require('../model/user-model')
const { ERROR } = require('../common/error')
const { raiseError } = require('../common/util')

exports.auth = async (req, res, next) => {
  // request header에 있는 Authorization의 값 예외처리
  let authorizationHeader;
  try {
    authorizationHeader = req.get('authorization').split(" ")
    if (authorizationHeader[0] !== "Bearer" || typeof authorizationHeader[1] !== "string" || typeof authorizationHeader[1] === "undefined") {
      raiseError(ERROR.AUTH.AUTHORIZATION_HEADER_EXCEPTION)
    }
  } catch (error) {
    raiseError(ERROR.AUTH.AUTHORIZATION_HEADER_EXCEPTION)
  }

  let decoded;
  try {
    decoded = jwt.verify(authorizationHeader[1], config.app.secret)  
  } catch (error) {
    return res.status(400).send(error)
  }

  const user = await userModel.findOne({ _id: decoded._id})
  if (user) {
    req.user = user
    next()
  } else {
    res.status(400).send("user가 없음")
  } 
}