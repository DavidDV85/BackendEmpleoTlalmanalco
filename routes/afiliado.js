const QueryTypes = require('sequelize'),
ErrorInfo = require('./error'),
fs = require("fs")
path = require("path"),
directorioTrabajo='Conoraf/files/',
c=console.log

const setAfiliadoMovil = async (req,res) => {
    if(req.body.IdDispositivo){
        let status = false
        if(req.body.TipoId >= 0 && req.body.UsuarioReg >= 0 && req.body.FReg.length >= 19 &&   req.body.Realm.length == 36 && req.body.Origen.length >= 3 && 
            req.body.Nombre.length >= 3 && req.body.Paterno.length >= 3 && req.body.Materno.length >= 3 && req.body.Email.length >= 0 && req.body.Telefono.length >= 0 && 
            req.body.Celular.length >= 0 && req.body.Facebook.length >= 0 && req.body.Twitter.length >= 0 && req.body.Instagram.length >= 0 && req.body.Latitud.length >= 3 && 
            req.body.Longitud.length >= 3 && req.body.Ubicacion.length >= 0 && req.body.Independiente >= 0 && req.body.Trabajo.length >= 1 && req.body.Nacimiento.length >= 19 && 
            req.body.Genero.length >= 1 && req.body.IdDispositivo.length >= 10 ){
                    status = true
        }
        if( status ){
            let query='EXEC APIMOV_AFILIADO_NUEVO :param1, :param2, :param3, :param4, :param5, :param6, :param7, :param8, :param9, :param10, :param11, :param12, :param13, '
            query += ':param14, :param15, :param16, :param17, :param18, :param19, :param20, :param21, :param22, :param23, :param24;'
			const parametros={ 'replacements': { 
                'param1' :req.body.TipoId, 'param2' :req.body.UsuarioReg, 'param3' :req.body.FReg, 'param4' :req.body.Realm,'param5' :req.body.Origen,'param6' :req.body.Nombre, 
                'param7' :req.body.Paterno, 'param8' :req.body.Materno, 'param9' :req.body.Email, 'param10' :req.body.Telefono, 'param11' :req.body.Celular, 
                'param12' :req.body.Facebook, 'param13' :req.body.Twitter, 'param14' :req.body.Instagram, 'param15' :req.body.Latitud, 'param16' :req.body.Longitud, 
                'param17' :req.body.Ubicacion, 'param18' :req.body.Independiente, 'param19' :req.body.Trabajo, 'param20' :req.body.Nacimiento, 'param21' :req.body.Genero, 
                'param22' :req.body.IdDispositivo,  'param23' :req.ip, 'param24' :0 }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 404,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ recibi: resultValues[0] } ,'utf-8')} `); 
                    if(resultado[0].keyId)
                        res.status(200).send({ respuesta: 1, mensaje: resultado[0].keyId });
                    else
                        res.status(200).send({ respuesta: resultado[0].resultado, mensaje: resultado[0].Mensaje });
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const getListaAfiliado = async (req,res) => {
    if(req.body.UsuarioReg && req.body.idDispositivo){
        if(req.body.UsuarioReg > 0 && req.body.idDispositivo.length > 10 ){
            let query='EXEC API_AFILIADO_BUSCAR :param1, :param2, :param3;'
			const parametros={ 'replacements': { 
                'param1': req.body.UsuarioReg, 'param2': req.body.idDispositivo, 'param3': req.ip }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                //c(`resultValues val ${JSON.stringify(resultado ,'utf-8')}`); 
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send({ resultado });
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const getListaAfiliadoMovil = async (req,res) => {
    if(req.body.UsuarioReg && req.body.idDispositivo){
        if(req.body.UsuarioReg > 0 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_AFILIADO_BUSCAR :param1, :param2, :param3;'
			const parametros={ 'replacements': { 'param1': req.body.UsuarioReg, 'param2': req.body.idDispositivo, 'param3': req.ip }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send(resultado);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const setAfiliadoDireccMovil = async (req,res) => {
    if(req.body.IdDispositivo){
        let status = false
        if(req.body.IdPerfil >= 0 && req.body.Freg.length >= 19 && req.body.Colonia >= 0 && req.body.Calle.length >= 3 && req.body.Noext.length >= 1 && 
            req.body.Noint.length >= 0 && req.body.Referencia.length >= 0 && req.body.Observ.length >= 0 && req.body.Alias.length >= 3 && req.body.IdDispositivo.length >= 10 ){
            status = true
        }
        if( status ){
            let query='EXEC APIMOV_AFILIADO_DIRECCION_NUEVO :param1, :param2, :param3, :param4, :param5, :param6, :param7, :param8, :param9, :param10, :param11, :param12;'
			const parametros={ 'replacements': { 
                'param1' :req.body.IdPerfil, 'param2' :req.body.Freg, 'param3' :req.body.Colonia, 'param4' :req.body.Calle,'param5' :req.body.Noext,'param6' :req.body.Noint, 
                'param7' :req.body.Referencia, 'param8' :req.body.Observ, 'param9' :req.body.Alias,'param10' :req.body.IdDispositivo, 'param11' :req.ip, 'param12' :0 }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 404,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ recibi: resultValues[0] } ,'utf-8')} `); 
                    if(resultado[0].keyId)
                        res.status(200).send({ respuesta: 1, mensaje: resultado[0].keyId });
                    else
                        res.status(200).send({ respuesta: resultado[0].resultado, mensaje: resultado[0].Mensaje });
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const getListaAfiliadoDireccMovil = async (req,res) => {
    if(req.body.Perfil && req.body.idDispositivo){
        if(req.body.Perfil > 0 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_AFILIADO_DIRECCION_BUSCAR :param1, :param2, :param3;'
			const parametros={ 'replacements': { 'param1': req.body.Perfil, 'param2': req.body.idDispositivo, 'param3': req.ip }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send(resultado);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}

const setAfiliadoServicioMovil = async (req,res) => {
    if(req.body.Perfil && req.body.FReg && req.body.Realm && req.body.Descripcion && req.body.IdDispositivo){
        if(req.body.Perfil > 0 && req.body.FReg.length >= 19 && req.body.Realm.length >= 0 && req.body.Descripcion.length >=3 && req.body.IdDispositivo.length > 10 ){
            let query='EXEC APIMOV_AFILIADO_SERVICIO_NUEVO :param1, :param2, :param3,:param4, :param5, :param6, :param7;'
			const parametros={ 'replacements': { 'param1': req.body.Perfil, 'param2': req.body.FReg, 'param3': req.body.Realm, 
            'param4': req.body.Descripcion, 'param5': req.body.IdDispositivo, 'param6': req.ip, 'param7': 0 }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send(resultado);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}

module.exports={
    setAfiliadoMovil:setAfiliadoMovil,
    getListaAfiliado:getListaAfiliado,
    getListaAfiliadoMovil:getListaAfiliadoMovil,
    setAfiliadoDireccMovil:setAfiliadoDireccMovil,
    getListaAfiliadoDireccMovil:getListaAfiliadoDireccMovil,
    setAfiliadoServicioMovil:setAfiliadoServicioMovil
}