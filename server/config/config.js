// PORT 
process.env.PORT = process.env.PORT || 3000

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// DB
let urlDB

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/biblioteca'
}
else{
    urlDB = 'mongodb://biblioteca-user:a123456@ds215172.mlab.com:15172/biblioteca'
}

process.env.URLDB = urlDB





