const express = require('express')
const router = express.Router()

// Bcrypt
const bcrypt = require('bcrypt')
// Underscore
const _ = require('underscore')

// Operaciones
const { InsertarUsuario, ObtenerUsuario, ObtenerUsuarios, ActualizarUsuario, DeshabilitarUsuario } = require('./operaciones')

// Autorizaciones
const { verificarToken, verificarAdminRole } = require('../auth/middlewares/autenticacion')


router.get('/usuarios', verificarToken, (req,res) => {
    
    ObtenerUsuarios()
        .then(usuariosDb => res.json({
            ok: true,
            usuarios: usuariosDb
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))

})


router.post('/usuario', [verificarToken, verificarAdminRole], (req,res) => {

    let body = req.body
  
    InsertarUsuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
        .then( usuarioDB => {
            res.json({
                ok: true,
                usuario: usuarioDB
            })
        })

        .catch( err => {
            res.status(400).json({
                ok: false,
                err
            })
        })
    
})


router.put('/usuario/:id', verificarToken, (req,res) => {

    let id = req.params.id
    let body = _.pick(req.body, ['nombre','email','img','google'])

    ActualizarUsuario(id, body)
        .then(usuario_actualizado => res.json({
            ok: true,
            usuario: usuario_actualizado
        }))
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))

})


router.delete('/usuario/:id', [verificarToken, verificarAdminRole], (req,res) => {

    let id = req.params.id

    let usuario_deshabilitado = {
        estado: false
    }
    
    DeshabilitarUsuario(id, usuario_deshabilitado)
    .then(usuariosDes => res.json({
        ok: true,
        usuario: usuariosDes
    }))
    .catch(err => res.status(400).json({
        ok: false,
        err
    }))
   
})



module.exports = router