const express = require('express')
const routes = require('./app/routes')

const app = express()
const port = 3000

routes(app)
app.listen(port, () => console.log(`servidor está rodando na porta ${port}`))

module.exports = app