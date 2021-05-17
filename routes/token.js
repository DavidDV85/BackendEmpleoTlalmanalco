const jwt=require('jsonwebtoken'),
QueryTypes = require('sequelize'),
randtoken = require('rand-token'),
configTok=require('../configs/config'),
moment = require('moment'),
ErrorInfo = require('./error'),
c= console.log

const apiResponse= (req,res,err,data) =>{
  if(err){
    ErrorInfo.setError(res, 500,`Error interno del servidor. ${err.message}`, null, null)
  } else {
    if(data){
      res.status(200).send({data})
    } else {
      ErrorInfo.setError(res, 404,`No existen datos en el API con tus parametros de busqueda.`, null, null)
    }
  }
}
const crearToken= (req,res,err,data,ip) =>{
  //c('Informacion del recibo tok: ',data) 
  if(data.length){
    moment.defaultFormat = "YYYY-MM-DDTHH:mm:ss";
    const refreshToken=randtoken.uid(256)
    const inicio=moment(new Date())
    let limite=moment(inicio).add(configTok.expiracion,'m')
    //c(`Usuario: ${data[0].userId} Ini:${moment(inicio).toISOString(true)} fin:${moment(limite).toISOString(true)}`)  
    const payload = {
      check:  true,
      id: data[0].userId,
      ip: ip,
      fecha_ini: moment(inicio).toISOString(true),
      fecha_fin: moment(limite).toISOString(true)
    };
    const tokenNew = jwt.sign(payload, configTok.llave, {
    expiresIn: configTok.expiracion_jwt, algorithm: 'HS512'
    });
    
    const infoToken = {
      token: tokenNew, id: data[0].userId, ip: ip, fecha_ini: moment(inicio).toISOString(true),
      fecha_vence:moment(limite).toISOString(true), refresh_token:refreshToken
    }
    //c('Info a guardar ',infoToken)
    data[0].userToken=tokenNew;
    let query='EXEC API_USUARIO_TOKEN :param1, :param2, :param3, :param4, :param5;'
			const parametros={ 'replacements': { 'param1': infoToken.id, 'param2': infoToken.token, 'param3': infoToken.fecha_ini, 'param4': infoToken.fecha_vence, 'param5': ip}, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const idToken = resultValues[0][0].keyId
                //c(`resultValues ${JSON.stringify(resultValues[0] ,'utf-8')} val ${idToken}`); 
                res.status(200).send((data[0])).json()
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', null, error) });
  } else {
      c('ERROR: ',err)    
      //res.status(404).send({ mensaje: "Usuario o contraseña incorrectos"})
  }
}

const postTokenRefresh= async (req,res) =>{
  const token = req.headers['access-token'];
  c(`Verificando RefreshToken user:${req.body.user} refresh: ${req.body.refreshToken} token: ${token}`)
  if (token) {
    jwt.verify(token, configTok.llave, (err, decoded) => {      
      if (err) {
        return res.json({ mensaje: 'Token inválida', error: err });    
      } else {
        if(req.body.refreshToken) { 
          c(`Verificando RefreshToken a Eliminar refresh: ${req.body.refreshToken}`)
          /*Token.findOneAndDelete(
            { refresh_token: req.body.refreshToken},
            (err,data) => {
              c('RefreshToken eliminado.')
            }
          )*/
        }
       console.log(`decodificado: ${decoded.id} Fini: ${decoded.fecha_ini} Ffin: ${decoded.fecha_fin}`)
       res.status(200).send({ mensaje: 'RefreshToken verificado.' });
      }
    });
  } else {
    res.send({ 
        mensaje: 'Token no proveída.' 
    });
  }
}
const postTokenReject= async (req,res) =>{
  if(req.body.refreshToken) { 
    c(`Verificando RefreshToken a Eliminar refresh: ${req.body.refreshToken}`)
    /*await Token.findOneAndDelete(
      { refresh_token: req.body.refreshToken},
      (err,data) => {
        res.status(200).send({ message: 'RefreshToken eliminado.'})    
      }
    )*/
  } else{
    ErrorInfo.setError(res, 400,'RefreshToken Invalido.', null, null)
  }
  
}
const getToken= async (req,res) =>{
  /*await Token
  .findById(req.params.id)
  .exec( (err,data) => apiResponse(req,res,err,data) )*/
}

module.exports={
  createToken:crearToken,
  postTokenRefresh,
  postTokenReject,
  getToken
}