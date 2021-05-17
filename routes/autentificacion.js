const Token = require('./token'),
QueryTypes = require('sequelize'),
ErrorInfo = require('./error'),
c=console.log

const iniciaSesion = async (req,res) => {
    if(req.body.user && req.body.pass && req.body.idDispositivo ){
        if(req.body.user.length >= 4 && req.body.pass.length >= 4 && req.body.idDispositivo.length > 10 ){
            let query='EXEC API_SESION_VERIFICA :param1, :param2, :param3, :param4;' //
			const parametros={ 'replacements': { 'param1': req.body.user, 'param2': req.body.pass, 'param3': req.body.idDispositivo, 'param4': req.ip}, 'type': QueryTypes.SELECT } //
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const idUsuario = resultValues[0][0].userId
                c(`resultValues val ${idUsuario}`); 
                if(idUsuario <= 0 ){
                    ErrorInfo.setError(res, 404,'Datos Incorrectos', "", null)
                } else {
                    let parametros= {
                        id : resultValues[0][0].userId,
                        usuario: resultValues[0][0].userNombre,
                        ip: req.ip
                    }
                    let err;
                    Token.createToken(req,res,err,resultValues[0],req.ip);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        } else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', "Verifica los datos.", null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const iniciaSesionMovil = async (req,res) => {
    if(req.body.user && req.body.pass && req.body.idDispositivo ){
        if(req.body.user.length >= 4 && req.body.pass.length >= 4 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_SESION_VERIFICA :param1, :param2, :param3, :param4;' //
			const parametros={ 'replacements': { 'param1': req.body.user, 'param2': req.body.pass, 'param3': req.body.idDispositivo, 'param4': req.ip}, 'type': QueryTypes.SELECT } //
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const idUsuario = resultValues[0][0].userId
                if(idUsuario <= 0 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', "", null)
                } else {
                    let param= { id : idUsuario, usuario: resultValues[0][0].userNombre, ip: req.ip }
                    let err;
                    Token.createToken(req,res,err,resultValues[0],req.ip);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        } else {
            ErrorInfo.setError(res, 204,'Datos Incorrectos', "Verifica los datos.", null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const iniciaSesionMovilAdmin = async (req,res) => {
    if(req.body.user && req.body.pass && req.body.idDispositivo ){
        if(req.body.user.length >= 4 && req.body.pass.length >= 4 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_SESION_VERIFICA_ADMIN :param1, :param2, :param3, :param4;' //
			const parametros={ 'replacements': { 'param1': req.body.user, 'param2': req.body.pass, 'param3': req.body.idDispositivo, 'param4': req.ip}, 'type': QueryTypes.SELECT } //
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const idUsuario = resultValues[0][0].userId
                if(idUsuario <= 0 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', "", null)
                } else {
                    let param= { id : idUsuario, usuario: resultValues[0][0].userNombre, ip: req.ip }
                    let err;
                    Token.createToken(req,res,err,resultValues[0],req.ip);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        } else {
            ErrorInfo.setError(res, 204,'Datos Incorrectos', "Verifica los datos.", null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
module.exports={
    autoriza:iniciaSesion,
    autorizaAndroid:iniciaSesionMovil,
    autorizaAndroidAdmin:iniciaSesionMovilAdmin
}