const express = require('express'),
rutasProtegidas= require('./middleware/route-protect'),
SistemMovil = require('./routes/sistema-movil'),
Autenticar = require('./routes/autentificacion'),
Usuario = require('./routes/usuario'),
Afiliado = require('./routes/afiliado'),
Locacion = require('./routes/locacion'),

swaggerUi = require('swagger-ui-express'),
swaggerJsdoc = require('swagger-jsdoc'),
swaggerOpt = require('./swagger/swagger-options'),
api=express.Router(),
fs = require('fs'),
multer= require('multer'),
ErrorInfo = require('./routes/error'),
maxSize = 5 * 1000 * 1000

const UPLOAD_PATH = "./uploads/";
const TYPE_IMAGE = { 'image/png': 'png', 'image/jpeg': 'jpeg', 'image/jpg': 'jpg' };
const TYPE_File = { 'application/pdf': 'pdf', };

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        fs.mkdirSync(UPLOAD_PATH, { recursive: true })
        cb(null, UPLOAD_PATH); //Multer en caso de no existir el directorio de destino indica el error, no crea el directorio
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname); //cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    let size = +req.rawHeaders.slice(-1)[0]
    if(!size){
        size=Number(req.body.size)
    }
    let isValid =false;
    if(!!TYPE_IMAGE[file.mimetype] && size < 5 * 1024 * 1024  ){
        isValid = true
    }
    if(!!TYPE_File[file.mimetype] && size < 2 * 1024 * 1024  ){
        isValid = true
    }
    if( size > 5 * 1024 * 1024  ){
        isValid = false
        let error = new Error('Archivo excede el tamaño limite 5MB.'); 
        cb(error);
    } 
    else{
        let error = isValid ? null : new Error('Tipo de archivo invalido');
        cb(error, isValid);
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter, limits: { fileSize: maxSize }}).single('profile') //Destino por default de subida multer({dest:'uploads/'})
const subir = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) { // A Multer error occurred when uploading.
            console.log(`Info ${err}`) //MulterError: File too large
            ErrorInfo.setError(res, 400,'Envio de Archivos', `${err}`, null)
        } else {
            next(); // Everything went fine.
        }
    })
}

api.post('/sistema-inicio', SistemMovil.ConfigInicio)
api.post('/sistema-inicio-admin', SistemMovil.ConfigInicioAdmin)
api.post('/sistema-fecha', SistemMovil.ConfigFecha)
api.post('/sistema-conexion', SistemMovil.ConfigConexion)
api.post('/autenticar', Autenticar.autoriza)
api.post('/autenticar-movil', Autenticar.autorizaAndroid)
api.post('/autenticar-movil-admin', Autenticar.autorizaAndroidAdmin)

api.post('/usuario-movil-gps', rutasProtegidas,Usuario.setInfoGps)
api.post('/usuario-movil-nuevo', rutasProtegidas,Usuario.postUsuario)
api.post('/usuario-movil-lista', rutasProtegidas,Usuario.getListaUsuario)
api.post('/usuario-movil-update', rutasProtegidas,Usuario.putUsuario)
api.post('/usuario-movil-update-status', rutasProtegidas,Usuario.putUsuarioStatus)

api.post('/locacion-movil-estado', Locacion.getListaEstadoMovil)
api.post('/locacion-movil-municipio', Locacion.getListaMunicipioMovil)
api.post('/locacion-movil-coloni-estado', Locacion.getListaColoniaMovil)
api.post('/locacion-movil-colonia-municipio', Locacion.getListaColoniaMuniMovil)

api.post('/afiliado-listxusuario', rutasProtegidas,Afiliado.getListaAfiliado)
api.post('/afiliado-movil-nuevo', rutasProtegidas,Afiliado.setAfiliadoMovil)
api.post('/afiliado-movil-listxusuario', rutasProtegidas,Afiliado.getListaAfiliadoMovil)
api.post('/afiliado-direccion-movil-nuevo', rutasProtegidas,Afiliado.setAfiliadoDireccMovil)
api.post('/afiliado-direccion-movil-listxperfil', rutasProtegidas,Afiliado.getListaAfiliadoDireccMovil)
api.post('/afiliado-servicio-movil-nuevo', rutasProtegidas,Afiliado.setAfiliadoServicioMovil)

module.exports=api