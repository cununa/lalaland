'use strict'

const noteModel = require('../model/note-model')
const userModel = require('../model/user-model')

exports.createNote = async (req, res) => {
    const { title, content } = req.body
    const { _id} = req.user
    const data = {
        title, 
        content,
        userId: _id 
    }
    const note = await noteModel.create(data)
    res.json(note)
}

exports.getNote = async (req, res) => {
    const { _id } = req.user
    const notes = await noteModel.find({ userId: _id})
    res.json(notes)
}

exports.updateNote = async (req, res) => {
    const { noteId, title, content } = req.body
    const note = await noteModel.findOneAndUpdate(
        { _id: noteId },
        { title, content},
        { upsert: true, new: true }
    )
    res.json(note)
}

exports.deleteNote = async (req, res) => {
    const { id } = req.params
    const note = await noteModel.deleteOne({ _id: id })
    res.json(note)
}

exports.deleteAllNote = async (req, res) => {
    const note = await noteModel.deleteMany()
    res.json(note)
}