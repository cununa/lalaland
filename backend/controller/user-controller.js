'use strict'

const userModel = require('../model/user-model')

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
