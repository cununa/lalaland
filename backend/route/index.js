'use strict'

module.exports = (app) => {
  app.use(require('./api'))
  // app.use(require('./test'))
  // app.use(require('./sample'))
  // app.use(require('./xiu'))

  // error handller
  app.use((err, req, res, next) => {
    console.log(err)
    res.json({
      code: 9999,
      message: err.message
    })
  })
}
