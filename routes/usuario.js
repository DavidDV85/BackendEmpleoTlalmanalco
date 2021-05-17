const QueryTypes = require('sequelize'),
ErrorInfo = require('./error'),
c=console.log

const getListaUsuario = async (req,res) => {
    if(req.body.cadena && req.body.idDispositivo){
        if(req.body.cadena.length >= 3 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_USUARIO_BUSCAR_ADMIN :param1;'
			const parametros={ 'replacements': { 'param1': req.body.cadena }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    res.status(200).send({ usrid : -1 });
                } else {
                    c(`resultValues total: ${resultado.length } `); 
                    res.status(200).send( resultValues[0]);
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
const putUsuario = async (req,res) => {
    if(req.body.IdUsuario && req.body.MetaUser >= 0 && req.body.Nombre && req.body.Usuario && req.body.Pass && req.body.Telefono.length >= 0 && req.body.idDispositivo){
        if(req.body.IdUsuario > 0 && req.body.Nombre.length >= 3  && req.body.Usuario.length >= 3 && req.body.Pass.length >= 3 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_USUARIO_EDITAR :param1, :param2, :param3, :param4, :param5, :param6, :param7;'
			const parametros={ 'replacements': { 'param1': req.body.IdUsuario, 'param2': req.body.MetaUser, 'param3': req.body.Nombre, 'param4': req.body.Usuario, 
            'param5': req.body.Pass, 'param6': req.body.Telefono, 'param7': req.body.TipoPromotor }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    res.status(200).send({ keyId : -1 });
                } else {
                    c(`resultValues total: ${resultado.length } `); 
                    res.status(200).send( {keyId: resultado[0].keyId});
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
const postUsuario = async (req,res) => {
    if(req.body.tipoUsuario >= 0 && req.body.coordinadorId >= 0 && req.body.seccion >= 0 && req.body.meta >= 0 && req.body.usuarioNombre.length >= 3
         && req.body.usuario.length >= 3 && req.body.contrasenia.length >= 3 && req.body.telefono.length >= 3 && req.body.tipoPromotor >= 0 ){
            let query='EXEC API_USUARIO_NUEVO :param1, :param2, :param3, :param4, :param5, :param6, :param7, :param8, :param9, :param10;'
			const parametros={ 'replacements': { 'param1': req.body.tipoUsuario, 'param2': req.body.coordinadorId, 'param3': req.body.seccion, 'param4': req.body.meta, 
            'param5': req.body.usuarioNombre, 'param6': req.body.usuario, 'param7': req.body.contrasenia, 'param8': req.body.telefono, 'param9': req.body.tipoPromotor, 'param10': 0 }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    res.status(200).send({ keyId : -1 });
                } else {
                    c(`resultValues total: ${resultado.length } `); 
                    res.status(200).send( {keyId: resultado[0].keyId});
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const putUsuarioStatus = async (req,res) => {
    if(req.body.idUsuario >= 0 && req.body.statusUsuario >= 0 && req.body.idDispositivo.length >= 10 ){
            let query='EXEC APIMOV_USUARIO_ESTATUS :param1, :param2, :param3, :param4;'
			const parametros={ 'replacements': { 'param1': req.body.idUsuario, 'param2': req.body.statusUsuario, 'param3': req.body.idDispositivo, 'param4': req.ip  }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    res.status(200).send({ keyId : -1 });
                } else {
                    c(`resultValues total: ${resultado.length } `); 
                    res.status(200).send( {keyId: resultado[0].keyId});
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const setInfoGps = async (req,res) => {
    if(req.body.usuario && req.body.idDispositivo && req.body.latitud && req.body.longitud){
        if(req.body.usuario > 0 && req.body.idDispositivo.length > 10 && req.body.latitud !== 0.0 && req.body.longitud !== 0.0){
            let query='EXEC APIMOV_USER_GPS :param1, :param2, :param3, :param4, :param5;'
			const parametros={ 'replacements': { 'param1': req.body.usuario, 'param2': req.body.latitud, 'param3': req.body.longitud, 'param4': req.body.idDispositivo, 'param5': req.ip}, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 404,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send({ status: 1, registroId: resultado[0].KeyId });
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
    getListaUsuario:getListaUsuario,
    putUsuario:putUsuario,
    postUsuario:postUsuario,
    putUsuarioStatus:putUsuarioStatus,
    setInfoGps:setInfoGps
}