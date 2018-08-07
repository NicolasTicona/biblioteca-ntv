require('../config/config')

const mongoose = require('mongoose')


mongoose.connect(process.env.URLDB, {useNewUrlParser: true} )
    .then( () => {
        console.log('Mongo ready')
    })
    .catch( (err) => {
        console.log(err)
    })