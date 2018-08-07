const mongoose = require('mongoose')


const Schema = mongoose.Schema

const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },

    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

    role: {
        type: String,
        default: 'USER_ROLE',
        enum: {
            values: ['ADMIN_ROLE', 'USER_ROLE'],
            message: '{VALUE} no es un rol válido'
        }
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },
    
    img: {
        type: String,
        required: false
    }

})

usuarioSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

let UsuarioModel = mongoose.model('usuario', usuarioSchema)

module.exports = UsuarioModel