'use strict'

const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')
const mongooseTimestamp = require('mongoose-timestamp')
const cors = require('cors')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//route & controller : api 경로와 기능으로 나누는 작업
const mainRouter = require('./route')
mainRouter(app)

// monngoDB 접속 & server listening 
mongoose.Promise = global.Promise
mongoose.plugin(mongooseTimestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

const { user, pass, host, name } = config.db
const url = `mongodb://${user}:${pass}@${host}/${name}?authSource=admin`
const options = { useNewUrlParser: true }

mongoose.connect(url, options).then(client => {
    console.log('mongoDB connection successful')
    const server = app.listen(8080, () => {
        console.log('Express server listening on port ' + server.address().port)
    })
})
