const express= require('express'),
jwt=require('jsonwebtoken'),
configTok=require('../configs/config'),
rutasProtegidas = express.Router(); 

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, configTok.llave,{algorithm: ['HS512']}, (err, decoded) => {      
        if (err) {
          return res.status(403).json({ mensaje: 'Token inválida', error: err });    
        } else {
          req.decoded = decoded;    
          console.log(`decodifica: ${decoded.id} Fini: ${decoded.fecha_ini} Ffin: ${decoded.fecha_fin}`)
          next();
        }
      });
    } else {
      res.status(401).send({ 
          mensaje: 'No se agrego el Token en los Headers de la petición.' 
      });
    }
 });

 module.exports= rutasProtegidas