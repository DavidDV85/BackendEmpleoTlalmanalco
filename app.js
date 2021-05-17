const express= require('express'), 
bodyParser= require('body-parser'),
configTok=require('./configs/config'),
config= require('./config'),
multer= require('multer'),
//upload=multer(),
app=express(),
router=require('./router')

app.set('llave', configTok.llave)
app.set('port',process.env.PORT)
//para parsear application/json
.use(express.json())
//para parsear application/xwww-form-urlencoded
.use(express.urlencoded({extended:false}))
//para parsear multipart/form-data
//.use(upload.array())

.use( (req,res,next) =>{ //Habilita CORS
  //https://enable-cors.org/
  res.header('Access-Control-Allow-Origin','*')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, Accept, access-token");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS') //habilita que formularios llamen a la API, programacion asincrona via AJAX
  next();
})
.use('/perfil', express.static(directorioTrabajo+'Perfil'))
.use('/registro', express.static(directorioTrabajo+'Evidencia')) 
.use('/aviso', express.static(directorioTrabajo+'Aviso')) 
.use('/api',router)
//.use('/docs',router)

module.exports=app