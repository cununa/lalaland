'use strict'

const noteModel = require('../model/note-model')
const userModel = require('../model/user-model')

exports.createNote = async (req, res) => {
    const { id,title, content } = req.body
    const [{ name }] = await userModel.find({ _id:id })
    const data = {title, name, content}
    const note = await noteModel.create(data)
    res.json(note)
}

exports.getNote = async (req, res) => {
    const note = await noteModel.find()
    res.json(note)
}

exports.updateNote = async (req, res) => {
    const { id, title, name, content } = req.body
    let data = {}
    if (title) data.title = title
    if (name) data.name = name
    if (content) data.content = content
    // findOneAndUpdate 형식
    // findOneAndUpdate(검색조건, 수정할 data, 옵션)
    const note = await noteModel.findOneAndUpdate(
        { _id: id },
        data,
        { upsert: true, new: true }
    )
    res.json(note)
}

exports.deleteNote = async (req, res) => {
    const { id } = req.query
    const note = await noteModel.deleteOne({ _id: id })
    // _id : mongoDB의 자동 생성 아이디
    // id : 사용자가 클라이언트에서 입력한 값 테스트시 id 사용
    res.json(note)
}

exports.deleteAllNote = async (req, res) => {
    const note = await noteModel.deleteMany()
    res.json(note)
}