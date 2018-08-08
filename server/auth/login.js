const express = require('express')
const router = express.Router()

const UsuarioModel = require('../db/models/usuario.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/login', (req,res) => {


    let body = req.body

    UsuarioModel.findOne({email: body.email}, (err, usuarioDB) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email o contraseña incorrectos'
                }
            })
        }

        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'email o contraseña incorrectos'
                }
            })
        }

        let token = jwt.sign({usuario: usuarioDB}, process.env.SEED, { expiresIn: 60*60*24*30})

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })
    })


})

module.exports = router