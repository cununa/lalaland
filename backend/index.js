'use strict'
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')
const mongooseTimestamp = require('mongoose-timestamp')
const cors = require('cors')
const db = require('./common/db-connect')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


//route & controller : api 경로와 기능으로 나누는 작업
const mainRouter = require('./route')

app.use(express.static(path.join(__dirname, '/www')))

mainRouter(app)

// monngoDB 접속 & server listening 
mongoose.Promise = global.Promise
mongoose.plugin(mongooseTimestamp, {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

app.set('port', process.env.PORT || 80);

db.connect().then(() => {
    const server = app.listen(app.get('port'), () => {
      console.log('Express server listening on port ' + server.address().port)
    })
  })
