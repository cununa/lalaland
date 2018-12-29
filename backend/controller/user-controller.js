'use strict'

const R = require('ramda')
const { ifElseP, raiseError } = require('../common/util')
const { ERROR } = require('../common/error')
const config = require('config')
const jwt = require('jsonwebtoken')
const userModel = require('../model/user-model')

const getToken = (user) => jwt.sign({ id: this.id }, config.app.secret)

exports.login = async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    console.log(req.body)
    console.log(user)
    if (user && req.body.password === user.password) {
      res.json({ 
        accessToken: getToken(user),
        email: user.email,
        name: user.name,
        phone: user.phone
      })
    } else {
        // throw 'login error'
        res.json({code:1000, message: '아이디 또는 비밀번호를 확인하세요.'})
    }
  }
  
  exports.join = async (req, res, next) => {
    const { email, name, password, phone, type = 1 } = req.body
  
    const getUser = ({ email }) => userModel.findOne({ email })
    const isAbleToCreateUser = (user) => Promise.resolve(user ? false : true)
    const createUser = (data) => userModel.create(data)
  
    const join = ifElseP(
      R.pipeP(getUser, isAbleToCreateUser),
      createUser,
      raiseError(ERROR.JOIN.USER_EMAIL_EXSISTS)
    )
    const result = await join({ email, name, password, phone, type })
    res.json(result)
  }
  
exports.createUser = async (req, res) => {
    // req : request(요청) 클라이언트가 보내는 요청 데이터

    // 중복체크하는 로직은 향후 업데이트 해야함!!!!!!!!!!!!!!!!!
    // 에러처리하는 부분도 향후 업데이트 해야함!!!!!!!!!!!!!!!!!
    // const name = req.body.name
    // const email = req.body.email
    // const phone = req.body.phone
    // const password = req.body.password
    console.log(req.body)
    const { name, email, phone, password } = req.body
    const data = {
        name, email, phone, password
    }
    const user = await userModel.create(data)
    console.log(user)
    res.json(user)
}

exports.getUser = async (req, res) => {
    const user = await userModel.find()
    res.json(user)
}

exports.updateUser = async (req, res) => {
    const { id, name, email, phone, password } = req.body

    console.log(req.body)

    let data = {}
    if (name) data.name = name
    if (email) data.email = email
    if (phone) data.phone = phone
    if (password) data.password = passowrd 
    // findOneAndUpdate 형식
    // findOneAndUpdate(검색조건, 수정할 data, 옵션)
    const user = await userModel.findOneAndUpdate(
        { _id: id },
        data,
        { upsert: true, new: true }
    )
    res.json(user)
}

exports.deleteUser = async (req, res) => {
    const { id } = req.query
    const user = await userModel.deleteOne({ _id: id })
    // _id : mongoDB의 자동 생성 아이디
    // id : 사용자가 클라이언트에서 입력한 값 테스트시 id 사용
    res.json(user)
}
