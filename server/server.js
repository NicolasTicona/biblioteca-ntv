require('./config/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// Parse JSON request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Rutas
app.use(require('./rutas/usuario'))
app.use(require('./auth/login'))

// Conectar Base de Datos
require('./db/connection')

app.listen(process.env.PORT, () => {
    console.log('Server listenning on port ', process.env.PORT)
})