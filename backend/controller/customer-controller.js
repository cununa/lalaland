'use strict'

const customerModel = require('../model/customer-model')

exports.createCustomer = async (req, res) => {
    const { company, name, email, phone } = req.body
    const data = {
        name, email, phone, company
    }
    const customer = await customerModel.create(data)
    res.json(customer)
}

exports.getCustomer = async (req, res) => {
    const customer = await customerModel.find()
    res.json(customer)
}

exports.updateCustomer = async (req, res) => {
    const { id, name, email, phone, company } = req.body
    let data = {}
    if (name) data.name = name
    if (email) data.email = email
    if (phone) data.phone = phone
    if (company) data.company = company 
    // findOneAndUpdate 형식
    // findOneAndUpdate(검색조건, 수정할 data, 옵션)
    const customer = await customerModel.findOneAndUpdate(
        { _id: id },
        data,
        { upsert: true, new: true }
    )
    res.json(customer)
}

exports.deleteCustomer = async (req, res) => {
    const { id } = req.query
    const customer = await customerModel.deleteOne({ _id: id })
    // _id : mongoDB의 자동 생성 아이디
    // id : 사용자가 클라이언트에서 입력한 값 테스트시 id 사용
    res.json(customer)
}