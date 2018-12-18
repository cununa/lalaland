const wrap = require('express-async-wrap')
const userController = require('../../controller/user-controller')
const customerController = require('../../controller/customer-controller')
const noteController = require('../../controller/note-controller')
const api = require('express').Router()

// api
//===================  user  ========================
api.put('/user', wrap(userController.createUser))
api.get('/user', wrap(userController.getUser))
api.post('/user', wrap(userController.updateUser))
api.delete('/user', wrap(userController.deleteUser))

//=================  customer  ======================
api.put('/customer', wrap(customerController.createCustomer))
api.get('/customer', wrap(customerController.getCustomer))
api.post('/customer', wrap(customerController.updateCustomer))
api.delete('/customer', wrap(customerController.deleteCustomer))

//=================  note  =========================
api.put('/note', wrap(noteController.createNote))
api.get('/note', wrap(noteController.getNote))
api.post('/note', wrap(noteController.updateNote))
api.delete('/note', wrap(noteController.deleteNote))
//모두 삭제
api.delete('/note/all', wrap(noteController.deleteAllNote))

//테스트용
// api.use('/', wrap(async (req, res) => {
//     res.send('hello world')
// }))

module.exports = api