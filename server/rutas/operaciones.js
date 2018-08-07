const UsuarioModel = require('../db/models/usuario.model')


const InsertarUsuario = (usuario_datos) => {

    return new Promise( (resolve,reject) => {

        let usuario = new UsuarioModel(usuario_datos)

        usuario.save( (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

const ObtenerUsuario = (id) => {

    return new Promise( (resolve, reject) => {

        UsuarioModel.findById(id)
            .exec( (err, res) => {
                if(err) reject(err)
                else resolve(res)
            })
    } )
}

const ObtenerUsuarios = () => {

    return new Promise( (resolve, reject) => {

        UsuarioModel.find({estado: true}, 'nombre email role img estado google')
            .exec((err, res) => {
                if(err) reject(err)
                else resolve(res)  
            })
    })
}

const ActualizarUsuario = (id, usuario_actualizacion) => {

    return new Promise( (resolve, reject) => {

        UsuarioModel.findByIdAndUpdate(id, usuario_actualizacion, {new: true}, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })
    })
}

const DeshabilitarUsuario = (id, usuario_actualizacion) => {

    return new Promise( (resolve, reject) => {

        UsuarioModel.findByIdAndUpdate(id, usuario_actualizacion, {new: true}, (err, res) => {
            if(err) reject(err)
            else resolve(res)
        })

    })
}

module.exports = {
    InsertarUsuario,
    ObtenerUsuario,
    ObtenerUsuarios,
    ActualizarUsuario,
    DeshabilitarUsuario
}