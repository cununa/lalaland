const wrap = require('express-async-wrap')
const userController = require('../../controller/user-controller')
const customerController = require('../../controller/customer-controller')
const noteController = require('../../controller/note-controller')
const authController = require('../../controller/auth-controller')
const reservationController = require('../../controller/reservation-controller')
const api = require('express').Router()



// api
//===================  auth  ========================
api.post('/join', wrap(userController.join))
api.post('/login', wrap(userController.login))
api.get('/check-auth', authController.auth, authController.jwtOnlyLogin)

// 회원가입, 로그인 이외에는 모두 authController를 거치는 구조 입니다.
api.use(authController.auth)

//===================  user  ========================
api.put('/user', wrap(userController.createUser))
api.get('/user', wrap(userController.getUser))
api.post('/user', wrap(userController.updateUser))
api.delete('/user', wrap(userController.deleteUser))

//=================  reservation  ======================
api.put('/reservation', wrap(reservationController.createReservation))
api.get('/reservation', wrap(reservationController.getReservation))
api.get('/reservation/:customerId', wrap(reservationController.getCustomerReservation))
api.post('/reservation', wrap(reservationController.updateReservation))
api.post('/update-reservation-payment', wrap(reservationController.updatePaymentPhase))
api.delete('/reservation/:reservationId', wrap(reservationController.deleteReservation))
api.delete('/removed-reservation/:reservationId', wrap(reservationController.deleteRemovedReservation))

//=================  customer  ======================
api.get('/customer', wrap(customerController.getCustomer))
api.post('/customer', wrap(customerController.updateCustomer))
api.delete('/customer/:id', wrap(customerController.deleteCustomer))

//=================  note  =========================
api.put('/note', wrap(noteController.createNote))
api.get('/note', wrap(noteController.getNote))
api.post('/note', wrap(noteController.updateNote))
api.delete('/note/:id', wrap(noteController.deleteNote))
//모두 삭제
api.delete('/note/all', wrap(noteController.deleteAllNote))

//테스트용
// api.use('/', wrap(async (req, res) => {
//     res.send('hello world')
// }))

module.exports = api